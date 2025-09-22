import { auth, signIn } from "@/lib/auth/auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GoogleSignIn from "@/components/customs/auth/SignIn/GoogleSignIn";
import FacebookSignIn from "@/components/customs/auth/SignIn/FacebookSignIn";
import Link from "next/link";
import SignInForm from "@/components/customs/auth/SignIn/SignInForm";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth();
  // console.log(session);
  if (session?.user) {
    redirect("/");
  }
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
          {/* <div className="relative flex items-center py-2">
            <Separator className="flex-1" />
            <span className="px-2 text-sm md:text-base lg:text-lg  text-gray-500">
              or continue with
            </span>
            <Separator className="flex-1" />
          </div> */}

          {/* Email + Password form */}
          {/* <SignInForm /> */}
        </CardContent>
      </Card>
    </div>
  );
}
