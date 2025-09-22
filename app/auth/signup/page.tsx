import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "@/components/customs/auth/signup/SignUpForm";
import GoogleSignIn from "@/components/customs/auth/SignIn/GoogleSignIn";
import FacebookSignIn from "@/components/customs/auth/SignIn/FacebookSignIn";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            Sign up to get started with{" "}
            <span className="font-semibold">PixelBay</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-3">
            <GoogleSignIn />
            <FacebookSignIn />
          </div>

          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div> */}

          {/* Signup Form */}
          {/* <SignUpForm /> */}
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-semibold text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
