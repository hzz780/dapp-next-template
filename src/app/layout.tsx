import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
// import ErrorBoundary from '@/components/ErrorBoundary';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*<ErrorBoundary>*/}
      <body className={inter.className}><div>GA Test1</div>{children}</body>
      {/*</ErrorBoundary>*/}
      <GoogleAnalytics gaId="G-0YWG600C1W" />
    </html>
  );
}
//
// if (typeof window !== "undefined") {
//   console.log('???? ', typeof window);
//   window.onerror = (a, b, c, d, e) => {
//     console.log(`message: ${a}`);
//     console.log(`source: ${b}`);
//     console.log(`lineno: ${c}`);
//     console.log(`colno: ${d}`);
//     console.log(`error: ${e}`);
//
//     return true;
//   };
// }
// if (typeof window !== "undefined") {
//   process.on('uncaughtException', function (err) {
//     console.log('uncaughtException:', err);
//   })
// }
