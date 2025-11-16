'use client';
import Header from "@/components/pages/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 min-h-screen">
      <Header />
      <main className="p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}

