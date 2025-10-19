import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My AWESOME Pet Site - Pet Management Platform",
  description: "A modern pet management platform built with Next.js and Supabase. Manage your pets, appointments, and photos all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
