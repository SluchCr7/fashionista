import Footer from "./Components/Footer";
import Header from "./Components/Header";
import CartContextProvider from "./Context/Cart";
import ProductContextProvider from "./Context/ProductContext";
import UserContextProvider from "./Context/UserContext";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"]
  , weight: ["100", "200", "300", "400", "500", "600"]
  , style: ["normal", "italic"]
})
export const metadata = {
  title: `Sluchawski.Co Store`,
  description: "Sluchawski.Co Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${jetBrainsMono.className} bg-white text-foreground`}
      >
        <UserContextProvider>
          <CartContextProvider>
            <ProductContextProvider>
              <Header />
              {children}
              <Footer/>
            </ProductContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
