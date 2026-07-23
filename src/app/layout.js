import "./globals.css";
import { MemoryProvider } from "@/lib/MemoryContext";

export const metadata = {
  title: "Digital Memory Capsule - Lưu giữ kỷ niệm tình yêu của hai bạn",
  description: "Trang web lưu trữ dòng thời gian kỷ niệm, album ảnh, thư tình bí mật và lời nhắn yêu thương ngọt ngào dành cho các cặp đôi.",
  keywords: "love diary, memory capsule, love web app, website tinh yeu, linh minh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-full flex flex-col theme-pink">
        <MemoryProvider>
          {children}
        </MemoryProvider>
      </body>
    </html>
  );
}
