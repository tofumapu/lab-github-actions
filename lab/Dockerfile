# Lab image dùng riêng để benchmark hiệu năng push/pull image ECS — KHÔNG chạy workload thật.
# amazoncorretto:21-alpine ~158 MB nén (đã verify qua docker buildx imagetools inspect) — đúng
# base image JRE thật đang dùng cho service production (xem legacy.yml / slide research),
# nên đây là kịch bản test sát với thực tế deploy hằng ngày hơn là image ML/data-heavy to.
#
# Nội dung image không quan trọng — cái cần đo là: kích thước sau nén (gzip vs zstd) và
# thời gian ECS Fargate task PENDING (pull + unpack) cho tới khi service ổn định.
FROM amazoncorretto:21-alpine

# Không có app thật nên giữ container sống bằng sleep — đủ để ECS coi task là RUNNING/STABLE.
CMD ["sleep", "infinity"]
