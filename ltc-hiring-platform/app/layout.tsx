import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LTC Hiring Platform",
  description: "A calm hiring platform for long-term care facilities and applicants."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-12 md:px-8">{children}</main>
      </body>
    </html>
  );
}
