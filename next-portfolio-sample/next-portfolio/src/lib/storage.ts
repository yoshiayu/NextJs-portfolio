export type ChatMessage = { role: "user" | "admin"; text: string; at: number };
export type Thread = { id: string; createdAt: number; messages: ChatMessage[] };

const THREADS_KEY = "threads";

function safe<T>(fn: () => T, fallback: T): T {
  try { return fn(); } catch { return fallback; }
}

export function listThreadIds(): string[] {
  return safe(() => JSON.parse(localStorage.getItem(THREADS_KEY) || "[]"), []);
}

export function readThread(id: string): Thread | null {
  return safe(() => JSON.parse(localStorage.getItem(`thread:${id}`) || "null"), null);
}

export function saveThread(t: Thread): void {
  const ids = new Set(listThreadIds());
  ids.add(t.id);
  localStorage.setItem(THREADS_KEY, JSON.stringify([...ids]));
  localStorage.setItem(`thread:${t.id}`, JSON.stringify(t));
}

export function createThread(id: string, initial?: ChatMessage): Thread {
  const t: Thread = { id, createdAt: Date.now(), messages: initial ? [initial] : [] };
  saveThread(t);
  return t;
}

export function appendMessage(id: string, msg: ChatMessage): Thread | null {
  const t = readThread(id);
  if (!t) return null;
  t.messages.push(msg);
  saveThread(t);
  return t;
}

export function listThreads(): Thread[] {
  return listThreadIds().map(readThread).filter(Boolean) as Thread[];
}
