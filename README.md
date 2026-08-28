# ecs-research — ECS Fargate deploy performance lab

A/B/C benchmark of container image compression and lazy-loading strategies on
**Amazon ECS Fargate**, measuring their real effect on `task PENDING` time
(image pull + unpack) — the phase AWS's own re:Invent analysis identifies as
the largest single contributor to Fargate task startup time.

Three arms, same base image, deployed side by side:

| Arm | Workflow | Technique |
|---|---|---|
| Legacy | [`lab-build-legacy-gzip.yml`](.github/workflows/lab-build-legacy-gzip.yml) | Classic Docker builder, default gzip layer compression (baseline) |
| Zstd | [`lab-build-zstd.yml`](.github/workflows/lab-build-zstd.yml) | `docker buildx` with Zstandard layer compression |
| SOCI | [`lab-build-soci.yml`](.github/workflows/lab-build-soci.yml) | Seekable OCI (SOCI) lazy-loading via `soci convert --standalone` |

Each workflow builds/pushes the lab image to Amazon ECR, deploys it to its own
ECS service on a shared Fargate cluster, then reads timestamps directly from
the ECS agent (`createdAt` → `connectivityAt` → `pullStartedAt` →
`pullStoppedAt` → `startedAt`) to report the real pull/unpack duration and
total task-launch time in the workflow's step summary.

## Structure

```
ecs-research/
├── ecr/
│   └── lifecycle-policy.json                 # keeps the last 10 images per arm, expires untagged
├── ecs/
│   ├── ecs-lab-perf-test-legacy.json          # ECS task definitions (image field
│   ├── ecs-lab-perf-test-soci.json            # is rewritten per run by the deploy job)
│   └── ecs-lab-perf-test-zstd.json
└── lab/
    └── Dockerfile                             # oversized base image on purpose —
                                                 # makes compression/lazy-load differences visible

.github/workflows/
├── lab-build-legacy-gzip.yml
├── lab-build-soci.yml
└── lab-build-zstd.yml
```

Workflow YAML files must stay under `.github/workflows/` — that's a hard
GitHub Actions requirement, not a structure choice — but every file each
workflow *acts on* (Dockerfile, task definitions, lifecycle policy) lives
under `ecs-research/`.

## Running a lab

Each workflow is `workflow_dispatch` only — trigger it from the **Actions**
tab. Requires two repo secrets (Settings → Secrets and variables → Actions):

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

Long-lived IAM user access keys are used here because this is a personal lab,
not a production pipeline — production should use OIDC role assumption
instead. The target ECS cluster (`labtest`) and its three services must
already exist; the workflows only build images and call
`update-service` / `register-task-definition`, they don't create
infrastructure.

## Results

Slide decks with the full writeup (kept outside this repo — local + published
separately) cover a real head-to-head run: same 4.45GB image, legacy gzip vs.
SOCI, triggered three seconds apart —

| Metric | Legacy | SOCI | Δ |
|---|---|---|---|
| Pull start → stop | 133.9s | 3.4s | −97.5% |
| Task launch (Created → Started) | 145.8s | 16.3s | −88.8% |
