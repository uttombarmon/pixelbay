import UserSidebar from "@/components/customs/user/userSidebar/UserSidebar";
import { auth } from "@/lib/auth/auth";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userRole = session?.user?.role;
  if (
    userRole !== "user" ||
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
          <UserSidebar />
        </div>

        {/* Mobile Sidebar (optional) */}
        <div className="md:hidden fixed top-0 left-0 z-50 w-full border-b bg-white dark:bg-neutral-900 p-4">
          <UserSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </SessionProvider>
  );
}
