import TopNavBar from "@/components/customs/navbar/TopNavBar";
import { SessionProvider } from "next-auth/react";

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full md:w-screen-md lg:w-screen-lg xl:w-screen-xl mx-auto">
      {/* Navbar */}
      <header className="w-full sticky top-0 z-50">
        <TopNavBar />
      </header>

      {/* Main content */}
      <main className="">
        <SessionProvider>{children}</SessionProvider>
      </main>
    </div>
  );
}
