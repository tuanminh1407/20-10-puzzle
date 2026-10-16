# Món quà nhỏ ngày 20/10 💗

Website mini game bằng React + Vite, gồm hai hành trình riêng:
- Dành tặng mẹ
- Dành tặng em gái

Mỗi câu hỏi hoàn thành mở một mảnh ghép. Khi hoàn thành hành trình, người nhận xem tấm thiệp cuối cùng.

## Chạy trên máy

Cần cài Node.js bản LTS.

```bash
npm install
npm run dev
```

Mở URL mà Vite hiện ra trong terminal (thường là http://localhost:5173).

Kiểm tra bản build:
```bash
npm run build
```

## Deploy miễn phí lên Vercel

### Cách dễ nhất: GitHub + Vercel
1. Giải nén ZIP.
2. Tạo repository mới trên GitHub và upload toàn bộ file trong thư mục này.
3. Vào https://vercel.com và đăng nhập bằng GitHub.
4. Chọn **Add New → Project**, import repository vừa tạo.
5. Framework preset: **Vite**; Build Command `npm run build`; Output Directory `dist`.
6. Bấm **Deploy**. Vercel sẽ cấp link HTTPS để chia sẻ.

Không cần backend, database hay biến môi trường.

## Chỉnh sửa nội dung
Mở `src/main.jsx`:
- Sửa câu hỏi trong `journeys.mom.questions` và `journeys.sister.questions`.
- Với câu hỏi có đáp án đúng, đặt `answer` thành chỉ số 0, 1 hoặc 2.
- Với câu hỏi không có đúng/sai, để `answer: null`.
- Chỉnh lời chúc trong thuộc tính `message`.
- Chỉnh tên người ký ở phần `Gia đình mình`.

## Lưu ý
Đây là bản mẫu frontend: tiến trình được giữ trong phiên đang mở, chưa đồng bộ giữa thiết bị và chưa có trang quản trị. Các câu hỏi/đáp án nằm trong mã nguồn nên không nên dùng như một bài kiểm tra bảo mật.
