# Little Love Studio — 20/10 v2

- Hai hành trình riêng cho mẹ và em gái.
- Câu hỏi thực tế, không có đáp án đúng/sai.
- Có thể chọn gợi ý, viết câu trả lời tự do hoặc để trống.
- Mỗi câu hoàn thành mở một mảnh ghép.
- Khi đủ 6 mảnh, người nhận tự ghép tranh bằng kéo-thả hoặc chạm chọn trên điện thoại.
- Ghép xong sẽ mở thiệp chúc mừng.

## Chạy local
Cài Node.js LTS, giải nén rồi mở terminal tại thư mục dự án:
```bash
npm install
npm run dev
```
Kiểm tra build: `npm run build`

## Deploy Vercel
1. Upload toàn bộ thư mục lên GitHub.
2. Vào https://vercel.com/new và import repository.
3. Chọn Vite, Build Command `npm run build`, Output Directory `dist`.
4. Deploy.

## Chỉnh nội dung
Sửa `journeys` trong `src/main.jsx`; ảnh thiệp ở `public/gift-art.svg`. Tiến trình và câu trả lời chỉ lưu trong bộ nhớ trang hiện tại, chưa đồng bộ hoặc lưu lại sau khi refresh.
