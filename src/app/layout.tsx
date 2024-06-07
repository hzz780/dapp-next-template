import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { AelfRegistry } from '@aelf-design/nextjs-registry';
import { GoogleAnalytics } from '@next/third-parties/google';
import "./ui/globals.css";
import { inter } from '@/app/ui/fonts';
import {StoreProvider} from './StoreProvider';

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
    <StoreProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <AntdRegistry>
            <AelfRegistry>
              {children}
            </AelfRegistry>
          </AntdRegistry>
        </body>
        <GoogleAnalytics gaId="G-0YWG600C1W" />
      </html>
    </StoreProvider>
  );
}
