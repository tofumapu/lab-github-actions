# Lab image dùng riêng để benchmark hiệu năng push/pull image ECS — KHÔNG chạy workload thật.
# amazoncorretto:21-al2023 ~215MB nén (2 layer, verify qua docker manifest inspect) — base JRE
# thật của các service Java trong production, thay cho nvidia/cuda:12.4.1-cudnn-devel (~4.45GB)
# dùng tạm trước đó chỉ để thấy rõ chênh lệch gzip/zstd/SOCI ở size lớn. Dùng lại al2023 (glibc,
# gần với môi trường prod thật) thay vì biến thể -alpine đã test trước đây.
#
# Nội dung image không quan trọng — cái cần đo là: kích thước sau nén (gzip vs zstd) và
# thời gian ECS Fargate task PENDING (pull + unpack, hoặc lazy-load qua SOCI) cho tới khi
# service ổn định.
FROM amazoncorretto:21-al2023

# Không có app thật nên giữ container sống bằng sleep — đủ để ECS coi task là RUNNING/STABLE.
CMD ["sleep", "infinity"]
