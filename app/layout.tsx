import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import AutoBreadcrumb from "./components/Breadcrumb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discover Delicious Meals",
  description: "Explore a collection of foods, ingredients, and recipes from around the world. Start your food diary today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />

        <AutoBreadcrumb />
        <div className="page-container max-w-7xl w-full mx-auto py-4 px-6">
          <main className="main-container">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
