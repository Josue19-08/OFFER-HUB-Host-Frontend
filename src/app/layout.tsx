import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "OFFER-HUB",
  description: "OFFER-HUB - Your marketplace platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
