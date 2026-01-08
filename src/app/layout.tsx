import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "OFFER-HUB",
  description: "OFFER-HUB - Your marketplace platform",
  icons: {
    icon: "/OFFER-HUB-logo.png",
    shortcut: "/OFFER-HUB-logo.png",
    apple: "/OFFER-HUB-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
