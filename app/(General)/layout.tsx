import TopNavBar from "@/components/customs/navbar/TopNavBar";
import { ModeToggle } from "@/components/themes/ChangeTheme";

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <TopNavBar />
      </div>
      <div>{children}</div>
    </div>
  );
}
