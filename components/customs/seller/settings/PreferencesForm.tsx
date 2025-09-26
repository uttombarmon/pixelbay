"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PreferencesForm() {
  const [prefs, setPrefs] = useState({
    notifications: true,
    darkMode: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Preferences Saved:", prefs);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          checked={prefs.notifications}
          onCheckedChange={(val: any) =>
            setPrefs({ ...prefs, notifications: val })
          }
        />
        <Label>Enable Notifications</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          checked={prefs.darkMode}
          onCheckedChange={(val: any) => setPrefs({ ...prefs, darkMode: val })}
        />
        <Label>Enable Dark Mode</Label>
      </div>
      <Button type="submit">Save Preferences</Button>
    </form>
  );
}
