"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { MessageInput } from "./message-input";

interface Message {
  id: string;
  users: {
    name: string;
  };
  text_content: string;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const supabase = createClientComponentClient();
  supabase
    .channel("my_chat")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (event) => {
        fetch();
      }
    )
    .subscribe();

  const fetch = async () => {
    const { data } = await supabase.from("messages").select("*, users(name)");

    setMessages(data as Message[]);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <MessageInput />
      <div className="flex flex-col">
        {messages?.map((msg) => (
          <div key={msg.id} className="flex flex-col gap-1">
            <div className="text-sm text-end">{msg.users.name}</div>
            <div className="rounded-md p-4 bg-blue-700">{msg.text_content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
