import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export const MessageInput = () => {
  const supabase = createClientComponentClient();
  const [message, setMessage] = useState("");
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase
      .from("messages")
      .insert({ text_content: message, created_by: user?.id });
    setMessage("");
  };
  return (
    <form className="flex w-full gap-2" onSubmit={handleSendMessage}>
      <input
        className="rounded-md px-4 flex-1 py-2 bg-inherit border mb-6 text-neutral-100"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />

      <button className="bg-green-700 rounded px-4 py-2 text-neutral-200 mb-6">
        send
      </button>
    </form>
  );
};
