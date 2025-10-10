import Asidebar from "@/components/customs/seller/asidebar/Asidebar";
import { auth } from "@/lib/auth/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
export default async function SellerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userRole = session?.user?.role;
  if (
    userRole !== "admin" ||
    userRole === undefined ||
    userRole === null ||
    !session
  ) {
    redirect("/");
  }
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Asidebar />
        </div>

        {/* Mobile Sidebar (optional) */}
        <div className="md:hidden fixed top-0 left-0 z-50 w-full border-b bg-white dark:bg-neutral-900 p-4">
          <Asidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-x-auto lg:overflow-x-hidden">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
