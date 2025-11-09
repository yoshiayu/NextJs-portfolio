'use client';

import { listThreads } from "@/lib/storage";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [rows, setRows] = useState<ReturnType<typeof listThreads>>([]);

  useEffect(() => {
    setRows(listThreads().sort((a, b) => b.createdAt - a.createdAt));
  }, []);

  return (
    <section style={{ display: "grid", gap: 12 }}>
      <h2>Admin</h2>
      <p style={{ color: "#666" }}>ローカル保存の全スレッドを一覧表示します。</p>
      <div style={{ border: "1px solid #eee", borderRadius: 8 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#fafafa" }}>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>ID</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>作成日時</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>件数</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>返信</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id}>
                <td style={{ padding: 8, borderBottom: "1px solid #f1f1f1" }}>{t.id}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f1f1f1" }}>{new Date(t.createdAt).toLocaleString()}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f1f1f1" }}>{t.messages.length}</td>
                <td style={{ padding: 8, borderBottom: "1px solid #f1f1f1" }}>
                  <a href={`/chat/${t.id}`}>返信する</a>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={4} style={{ padding: 12, color: "#777" }}>スレッドはまだありません。</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p style={{ color: "#999", fontSize: 12 }}>※ 認証は未実装（後で Firebase Auth / NextAuth を導入）</p>
    </section>
  );
}
