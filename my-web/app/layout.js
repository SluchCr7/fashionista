import "./globals.css";
import Providers from "./Components/Providers";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

// Since this is now a Server Component, exporting metadata is allowed
export const metadata = {
  title: `Fashionista | Premium Fashion`,
  description: "Discover the latest trends in high-end fashion with Fashionista.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-background text-foreground antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
