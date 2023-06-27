import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col max-w-3xl">
      <div className="flex gap-8 ">
        <Image
          src="/supabase.svg"
          alt="Supabase Logo"
          width={225}
          height={45}
          priority
        />
        <div className="border-l rotate-45 h-10"></div>
        <Image
          src="/next.svg"
          alt="Vercel Logo"
          width={150}
          height={36}
          priority
        />
      </div>
      {user && <div>chat</div>}
    </div>
  );
}
