"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useState } from "react";

export default async function Profile() {
  const [name, setName] = useState<undefined | string>();
  const supabase = createClientComponentClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.from("users").insert({ user_id: user?.id, name });
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
        name="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder="Krzysztof Ibisz"
      />

      <button className="bg-green-700 rounded px-4 py-2 text-neutral-200 mb-6">
        Update account details
      </button>
    </form>
  );
}
