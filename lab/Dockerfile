# Lab image dùng riêng để benchmark hiệu năng push/pull image ECS — KHÔNG chạy workload thật.
# nvidia/cuda:12.4.1-cudnn-devel ~4.45 GB nén (đã verify qua docker buildx imagetools inspect)
# — quay lại image to sau khi test với amazoncorretto (~158MB) cho thấy chênh lệch gzip/zstd/SOCI
# gần như không đáng kể ở size nhỏ. CUDA toolkit + cuDNN devel gồm rất nhiều file nhị phân/thư
# viện lớn, tải công khai được từ Docker Hub, không cần đăng nhập NGC.
#
# Nội dung image không quan trọng — cái cần đo là: kích thước sau nén (gzip vs zstd) và
# thời gian ECS Fargate task PENDING (pull + unpack, hoặc lazy-load qua SOCI) cho tới khi
# service ổn định — image to hơn giúp thấy rõ khác biệt cả 3 arm hơn nhiều.
FROM nvidia/cuda:12.4.1-cudnn-devel-ubuntu22.04

# Không có app thật nên giữ container sống bằng sleep — đủ để ECS coi task là RUNNING/STABLE.
CMD ["sleep", "infinity"]
