import TopNavBar from "@/components/customs/navbar/TopNavBar";

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-x-hidden">
      <div>
        <TopNavBar />
      </div>
      <div>{children}</div>
    </div>
  );
}
