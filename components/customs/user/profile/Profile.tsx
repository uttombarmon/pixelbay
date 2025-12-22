import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Form from "./Form";
import { auth } from "@/lib/auth/auth";

const ProfilePage = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Access Denied</h3>
          <p className="text-muted-foreground">You must be signed in to view this page.</p>
        </div>
      </div>
    );
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/user?userId=${session?.user?.id}`
  );
  const { user } = await res.json();
  if (!user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">User not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {/* Profile Sidebar/Card */}
        <Card className="h-fit overflow-hidden border-none shadow-lg bg-card/50 backdrop-blur-sm">
          <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5">
            <div className="absolute -bottom-12 left-6">
              <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                <AvatarImage src={user?.image} className="object-cover" />
                <AvatarFallback className="text-2xl">{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <CardContent className="pt-16 pb-6 px-6 space-y-4">
            <div>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium">Role</span>
                <span className="text-xs uppercase tracking-wider bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">
                  {user?.role}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-medium">Member Since</span>
                <span className="text-sm text-muted-foreground">Dec 2023</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Update Profile Form */}
        <div className="space-y-6">
          <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <p className="text-sm text-muted-foreground">Update your personal details here.</p>
            </CardHeader>
            <CardContent>
              <Form userData={user} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
