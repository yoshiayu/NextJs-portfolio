'use client';

import { useEffect, useState } from "react";
import { appendMessage, readThread, type Thread } from "@/lib/storage";

export default function ChatWindow({ id, role }: { id: string; role: "user" | "admin" }) {
  const [thread, setThread] = useState<Thread | null>(null);
  const [text, setText] = useState("");

  useEffect(() => { setThread(readThread(id)); }, [id]);

  const send = () => {
    if (!text.trim()) return;
    const updated = appendMessage(id, { role, text: text.trim(), at: Date.now() });
    setThread(updated);
    setText("");
  };

  if (!thread) return <p>スレッドが見つかりません。</p>;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, minHeight: 240, display: "grid", gap: 8, background: "#fafafa" }}>
        {thread.messages.length === 0 && <p style={{ color: "#777" }}>メッセージはまだありません。</p>}
        {thread.messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "start" : "end", maxWidth: "80%" }}>
            <div style={{ padding: "8px 12px", borderRadius: 12, background: m.role === "user" ? "#fff" : "#e9f3ff", border: "1px solid #ddd" }}>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 4 }}>
                {m.role === "user" ? "ユーザー" : "管理者"} / {new Date(m.at).toLocaleString()}
              </div>
              <div>{m.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="メッセージを入力"
          style={{ flex: 1, padding: 8, border: "1px solid #ddd", borderRadius: 8 }} />
        <button onClick={send} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd" }}>
          送信
        </button>
      </div>
    </div>
  );
}
