import { auth, signIn } from "@/lib/auth/auth";

export default async function SignIn() {
  const session = await auth();
  console.log(session);
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Sign in Google</button>
    </form>
  );
}
