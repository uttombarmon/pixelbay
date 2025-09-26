import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Form from "./Form";
import { auth } from "@/lib/auth/auth";

const ProfilePage = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return (
      <div className="text-center text-gray-500 mt-10">
        You must be signed in to view this page.
      </div>
    );
  }
  const res = await fetch(
    `http://localhost:3000/api/user?userId=${session?.user?.id}`
  );
  const { user } = await res.json();
  if (!user) {
    return (
      <div className="text-center text-gray-500 mt-10">User not found.</div>
    );
  }

  return (
    <div className="grid gap-6 max-w-3xl mx-auto">
      {/* Profile Card */}
      <Card className="p-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">My Profile</h2>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user?.image} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg font-medium">{user?.name}</p>
            <p className="text-muted-foreground">{user?.email}</p>
            <p className="text-sm text-gray-500">Role: {user?.role}</p>
          </div>
        </CardContent>
      </Card>

      {/* Update Profile Form */}
      <Form userData={user} />
    </div>
  );
};
export default ProfilePage;
