'use client';

import { useState } from "react";
import { generateId } from "@/lib/id";
import { createThread } from "@/lib/storage";

export default function ContactPage() {
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const [initialText, setInitialText] = useState("");

  const create = () => {
    const id = generateId(10);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    createThread(id, initialText.trim() ? { role: "user", text: initialText.trim(), at: Date.now() } : undefined);
    setCreatedUrl(`${origin}/chat/${id}`);
  };

  return (
    <section style={{ display: "grid", gap: 12 }}>
      <h2>Contact</h2>
      <p>相談や問い合わせを送信すると、専用URLが発行されます。</p>
      <textarea value={initialText} onChange={(e) => setInitialText(e.target.value)} rows={4}
        placeholder="最初の相談内容（任意）" style={{ padding: 8, border: "1px solid #ddd", borderRadius: 8 }} />
      <button onClick={create} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd", width: 180 }}>
        専用URLを発行
      </button>

      {createdUrl && (
        <div style={{ padding: 12, border: "1px solid #cde", background: "#f5fbff", borderRadius: 8 }}>
          <div>専用URLを共有してください：</div>
          <a href={createdUrl} style={{ wordBreak: "break-all" }}>{createdUrl}</a>
        </div>
      )}
    </section>
  );
}
