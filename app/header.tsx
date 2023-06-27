import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./logout-button";

export const Header = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: userProfile } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user?.id)
    .maybeSingle();

  return (
    <div className="flex flex-col max-w-3xl mt-24">
      <div className="flex border-b py-3 text-sm text-neutral-100">
        <span className="ml-auto">
          {user ? (
            <span className="flex gap-4">
              Hey, {userProfile?.name || user.email}!{" "}
              <span className="border-r"></span>{" "}
              <Link href="/" className="text-neutral-100 hover:underline">
                Home
              </Link>
              <Link
                href="/profile"
                className="text-neutral-100 hover:underline"
              >
                Profile
              </Link>
              <LogoutButton />
            </span>
          ) : (
            <span className="flex gap-4">
              <Link href="/" className="text-neutral-100 hover:underline">
                Home
              </Link>
              <Link href="/login" className="text-neutral-100 hover:underline">
                Login
              </Link>
            </span>
          )}
        </span>
      </div>
    </div>
  );
};
