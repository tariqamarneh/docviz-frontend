import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ThemeModeScript } from "flowbite-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocViz",
  description: "document visualization tool",
  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
    ],
    apple: [
      {
        url: '/favicon.ico',
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" className="overscroll-none">
        <head>
          <ThemeModeScript />
        </head>
        <body className={`${inter.className} bg-gradient-to-r to-gray-400 from-gray-100 dark:bg-gradient-to-r dark:to-slate-900 dark:from-slate-600 overscroll-none`}>
          <Flowbite>
            {children}
            <div className='fixed bottom-2 right-2 z-50'>
              <DarkThemeToggle />
            </div>
          </Flowbite>
        </body>
      </html>
    </SessionProvider>
  );
}
