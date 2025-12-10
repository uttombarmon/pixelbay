"use client";

interface SpecSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SpecSection({ title, children }: SpecSectionProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

interface SpecItemProps {
  label: string;
  value: string | number | null | undefined;
  sublabel?: string;
}

export function SpecItem({ label, value, sublabel }: SpecItemProps) {
  if (!value) return null;

  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-base">{value}</p>
      {sublabel && <p className="text-sm text-muted-foreground">{sublabel}</p>}
    </div>
  );
}
