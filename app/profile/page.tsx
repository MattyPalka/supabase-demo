"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const supabase = createClientComponentClient();
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    e.preventDefault();
    await supabase.from("users").upsert({ name: username, user_id: user?.id });
  };

  return (
    <form
      className="flex flex-col w-full max-w-sm justify-center gap-2"
      onSubmit={handleProfileUpdate}
    >
      <label className="text-md text-neutral-400" htmlFor="email">
        name
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6 text-neutral-100"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Krzysztof Ibisz"
      />

      <button className="bg-green-700 rounded px-4 py-2 text-neutral-200 mb-6">
        Update account details
      </button>
    </form>
  );
}
