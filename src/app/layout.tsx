import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prédicteur de trafic",
  description: "Application de prédiction du trafic routier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ConfigProvider theme={{ token: { colorPrimary: "#007f5f" } }}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
