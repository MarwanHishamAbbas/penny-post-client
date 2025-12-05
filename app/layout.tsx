
import Providers from "@/src/shared/providers";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <Providers>

          {children}
        </Providers>
      </body>
    </html>
  );
}
