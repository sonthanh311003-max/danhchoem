import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata = {
  title: "MemoryOS - Preserving Life's Beautiful Moments",
  description: "MemoryOS is an Experience Builder helping people preserve life's most meaningful moments through beautiful interactive experiences.",
  keywords: "love diary, memory capsule, keepsake builder, interactive letters, memoryos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FFF9F8] transition-colors duration-500">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
