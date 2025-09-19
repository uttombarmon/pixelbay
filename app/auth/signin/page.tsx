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

export default async function SignInPage() {
  const session = await auth();
  console.log(session);
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
            <Button variant="outline" className="w-full flex gap-2">
              <svg
                className=" size-5"
                xmlns="http://www.w3.org/2000/svg"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
                viewBox="0 0 509 509"
              >
                <g fill-rule="nonzero">
                  <path
                    fill="#0866FF"
                    d="M509 254.5C509 113.94 395.06 0 254.5 0S0 113.94 0 254.5C0 373.86 82.17 474 193.02 501.51V332.27h-52.48V254.5h52.48v-33.51c0-86.63 39.2-126.78 124.24-126.78 16.13 0 43.95 3.17 55.33 6.33v70.5c-6.01-.63-16.44-.95-29.4-.95-41.73 0-57.86 15.81-57.86 56.91v27.5h83.13l-14.28 77.77h-68.85v174.87C411.35 491.92 509 384.62 509 254.5z"
                  />
                  <path
                    fill="#fff"
                    d="M354.18 332.27l14.28-77.77h-83.13V227c0-41.1 16.13-56.91 57.86-56.91 12.96 0 23.39.32 29.4.95v-70.5c-11.38-3.16-39.2-6.33-55.33-6.33-85.04 0-124.24 40.16-124.24 126.78v33.51h-52.48v77.77h52.48v169.24c19.69 4.88 40.28 7.49 61.48 7.49 10.44 0 20.72-.64 30.83-1.86V332.27h68.85z"
                  />
                </g>
              </svg>
              Continue with Facebook
            </Button>
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
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <div className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
