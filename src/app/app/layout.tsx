import Header from "@/components/layout/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="bg-gradient-to-br from-background-100 to-background-200 p-4">
        {children}
      </div>
    </div>
  );
}
