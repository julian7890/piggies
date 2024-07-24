import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Title from "@/components/ui/Title";
import NavigationBar from "@/components/ui/navigationBar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Piggies",
  description: "Displaying season stats for NYC baseball team Piggies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <body className={`relative ${inter.className} bg-[#212E41] text-white`}>
        <Title />
        <NavigationBar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
