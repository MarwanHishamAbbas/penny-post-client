
import Providers from "@/src/shared/providers";
import "../globals.css";
import { Toaster } from 'sonner'
import Navbar from "@/src/components/navbar";

import { Inter } from 'next/font/google'
import Footer from "@/src/components/ui/footer";

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
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <Providers>
          <Navbar />
          <main className="max-w-7xl mx-auto px-2">

            {children}
          </main>
        </Providers>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
