import TopNavBar from "@/components/customs/navbar/TopNavBar";
import { SessionProvider } from "next-auth/react";

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col mx-auto">
      {/* Navbar */}
      <header className="w-full sticky top-0 z-50">
        <TopNavBar />
      </header>

      {/* Main content */}
      <main className="w-full min-w-0 flex-1">
        <SessionProvider>{children}</SessionProvider>
      </main>
    </div>
  );
}
