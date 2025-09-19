import { auth, signIn } from "@/lib/auth/auth";

// export default async function SignIn() {
//   const session = await auth();
//   console.log(session);
//   return (
//     <form
//       action={async () => {
//         "use server";
//         await signIn("google");
//       }}
//     >
//       <button type="submit">Sign in Google</button>
//     </form>
//   );
// }

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import GoogleSignIn from "@/components/customs/auth/SignIn/GoogleSignIn";
import { redirect } from "next/navigation";
import FacebookSignIn from "@/components/customs/auth/SignIn/FacebookSignIn";
import Link from "next/link";

export default async function SignInPage() {
  const session = await auth();
  console.log(session);
  // if (session?.user) {
  //   redirect("/");
  // }
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back 👋</CardTitle>
          <CardDescription>
            Sign in to your <span className="font-semibold">PixelBay</span>{" "}
            account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 font">
          {/* 🔥 Social login buttons */}
          <div className="space-y-3">
            <GoogleSignIn />
            <FacebookSignIn />
          </div>

          {/* Separator */}
          <div className="relative flex items-center py-2">
            <Separator className="flex-1" />
            <span className="px-2 text-sm md:text-base lg:text-lg  text-gray-500">
              or continue with
            </span>
            <Separator className="flex-1" />
          </div>

          {/* Email + Password form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <div className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
