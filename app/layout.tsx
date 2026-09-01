import "./globals.css";

export const metadata = {
  title: "KITAABIA — Read. Learn. Grow.",
  description: "A modern digital library for discovering and reading books.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
