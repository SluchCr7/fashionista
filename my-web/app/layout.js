'use client';
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import LayoutComponent from "./Components/LayoutComponent";
import AdContextProvider from "./Context/AdsContext";
import CartContextProvider from "./Context/Cart";
import ProductContextProvider from "./Context/ProductContext";
import ReviewContextProvider, { ReviewContext } from "./Context/ReviewContext";
import UserContextProvider from "./Context/UserContext";
import ThemeProvider from "./Context/ThemeContext";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter, Playfair_Display } from "next/font/google";
import { ToastContainer } from "react-toastify";

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
        <ThemeProvider>
          <UserContextProvider>
            <CartContextProvider>
              <ProductContextProvider>
                <AdContextProvider>
                  <ReviewContextProvider>
                    <LayoutComponent>
                      {children}
                    </LayoutComponent>
                  </ReviewContextProvider>
                </AdContextProvider>
              </ProductContextProvider>
            </CartContextProvider>
          </UserContextProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{ zIndex: 99999 }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
