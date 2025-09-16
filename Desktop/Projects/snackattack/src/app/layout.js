import { Inter } from "next/font/google";
import { config } from "@/helpers/config";
import "@/styles/index.scss";
import Header from "@/components/common/header/Header";

import CartProvider from "@/provider/CartProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: `%s | ${config.project.name}`,
    default: config.project.name,
  },
  description: config.project.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons.png" sizes="any" />
        <link
          rel="icon"
          href="./icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={inter.className}>
        <Toaster position="top-right" reverseOrder={false} />

        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow">{children}</main>
            
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
