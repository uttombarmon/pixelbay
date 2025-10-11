import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SignOutButton } from "../buttons/SignOutButton";

const Account = async ({ user }: { user: any }) => {
  console.log(user);
  return (
    <div>
      {user?.role == "admin" ? (
        <Link href={"/seller"}>
          <Avatar>
            <AvatarImage src={user?.image} />
            <AvatarFallback>{user?.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.image} />
              <AvatarFallback>{user?.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/dashboard"}>Dashboard</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Link href={"/dashboard/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/dashboard/mycart"}>My Cart</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/dashboard/billing"}>Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignOutButton>Sign Out</SignOutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Account;
