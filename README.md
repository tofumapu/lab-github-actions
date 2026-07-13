# Hướng dẫn chạy Unit Test và Build Coverage

Đây là dự án Node.js đơn giản sử dụng Jest để thực hiện chạy Unit Test và sinh báo cáo độ bao phủ mã nguồn (Coverage).

## Cấu trúc thư mục

* `src/math.js`: Chứa các hàm tính toán cơ bản (cộng, trừ, nhân, chia).
* `src/index.js`: Điểm chạy chính của ứng dụng.
* `tests/math.test.js`: File chứa các unit test cho các hàm trong `math.js`.

## Cách cài đặt và chạy thử

### 1. Cài đặt các thư viện phụ thuộc

Cài đặt các gói cần thiết bằng lệnh:

```bash
npm install
```

### 2. Chạy ứng dụng

Chạy file chạy chính:

```bash
node src/index.js
```

### 3. Chạy Unit Test

Chạy toàn bộ các unit test đã viết:

```bash
npm run test
```

### 4. Tạo báo cáo Coverage

Chạy lệnh sau để kiểm tra độ bao phủ mã nguồn và sinh báo cáo:

```bash
npm run test:coverage
```

Sau khi chạy xong, thư mục `coverage` sẽ được tạo ra. Bạn có thể mở file `coverage/lcov-report/index.html` trên trình duyệt để xem báo cáo chi tiết trực quan.