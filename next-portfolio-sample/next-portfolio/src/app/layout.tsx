import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "My Portfolio",
  description: "Next.js Minimal Portfolio with simple chat demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1000,
            background: "#fff",
            borderBottom: "1px solid #eee",
          }}
        >
          <nav style={{ display: "flex", gap: 8, padding: "12px 16px" }}>
           
            <Link href="/" prefetch style={{ display: "inline-block", padding: "6px 10px", cursor: "pointer" }}>
              Home
            </Link>
            <Link href="/works" prefetch style={{ display: "inline-block", padding: "6px 10px", cursor: "pointer" }}>
              Works
            </Link>
            <Link href="/contact" prefetch style={{ display: "inline-block", padding: "6px 10px", cursor: "pointer" }}>
              Contact
            </Link>
            <div style={{ marginLeft: "auto" }}>
              <Link href="/admin" prefetch style={{ display: "inline-block", padding: "6px 10px", cursor: "pointer" }}>
                Admin
              </Link>
            </div>
          </nav>
        </header>

        
        <main style={{ position: "relative", zIndex: 0, padding: "16px", maxWidth: 960, margin: "0 auto" }}>
          {children}
        </main>

        <footer style={{ padding: "24px", textAlign: "center", color: "#666" }}>
          © {new Date().getFullYear()} Your Name
        </footer>
      </body>
    </html>
  );
}
