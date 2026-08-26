# Lab image dùng riêng để benchmark hiệu năng push/pull image ECS — KHÔNG chạy workload thật.
# continuumio/anaconda3 ~3.4 GB uncompressed, gồm rất nhiều file nhỏ (conda packages, python libs)
# => đại diện tốt cho case "ML/data-heavy image" mà zstd/SOCI nhắm tới, và tải công khai được
# từ Docker Hub nên ai chạy lại lab này cũng ra cùng một baseline.
#
# Nội dung image không quan trọng — cái cần đo là: kích thước sau nén (gzip vs zstd) và
# thời gian ECS Fargate task PENDING (pull + unpack) cho tới khi service ổn định.
FROM continuumio/anaconda3:latest

# Không có app thật nên giữ container sống bằng sleep — đủ để ECS coi task là RUNNING/STABLE.
CMD ["sleep", "infinity"]
