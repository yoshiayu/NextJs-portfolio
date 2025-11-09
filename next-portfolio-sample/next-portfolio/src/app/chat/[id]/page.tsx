'use client';

import { useParams } from "next/navigation";
import ChatWindow from "@/components/ChatWindow";

export default function ChatPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  return (
    <section style={{ display: "grid", gap: 12 }}>
      <h2>Chat（専用URL）</h2>
      <p style={{ color: "#666" }}>URLを知っている人のみが閲覧・書き込みできます。</p>
      <ChatWindow id={id} role="user" />
    </section>
  );
}
