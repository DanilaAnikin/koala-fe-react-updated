import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koala42 FE Assessment",
  description: "Created a next app for Koala42 by Danila Anikin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
