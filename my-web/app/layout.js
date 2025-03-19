import Footer from "./Components/Footer";
import Header from "./Components/Header";
import AdContextProvider from "./Context/AdsContext";
import CartContextProvider from "./Context/Cart";
import ProductContextProvider from "./Context/ProductContext";
import ReviewContextProvider, { ReviewContext } from "./Context/ReviewContext";
import UserContextProvider from "./Context/UserContext";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"]
  , weight: ["100", "200", "300", "400", "500", "600"]
  , style: ["normal", "italic"]
})
export const metadata = {
  title: `Fashionista`,
  description: "Fashionista is a fashion website has been created to provide you with the best fashion products that you need.",
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
              <AdContextProvider>
                <ReviewContextProvider>
                  <Header />
                  {children}
                  <Footer/>
                </ReviewContextProvider>
              </AdContextProvider>
            </ProductContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
