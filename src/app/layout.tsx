import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";


export const metadata: Metadata = {
  title: "Prédicteur de trafic",
  description: "Application de prédiction du trafic routier",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={'bg-orange-700'}>
        <ConfigProvider theme={{ token: { colorPrimary: "#007f5f" } }}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
