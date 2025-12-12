
import Providers from "@/src/shared/providers";
import "../globals.css";
import { Toaster } from 'sonner'
import Navbar from "@/src/components/navbar";

import { Inter } from 'next/font/google'

// Configure the Inter font loader
// Variable fonts like Inter do not require specifying a weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // 'swap' ensures fallback font is used while Inter loads
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body
        className="antialiased"
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
