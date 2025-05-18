import { ConfigProvider } from "antd";
import Header from "@/components/layout/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <>{children}</>
    </>
  );
}
