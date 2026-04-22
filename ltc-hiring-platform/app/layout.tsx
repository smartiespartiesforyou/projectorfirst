import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LTC Hiring Platform',
  description: 'Calm, focused hiring for long-term care.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-10 md:py-14">{children}</main>
      </body>
    </html>
  );
}
