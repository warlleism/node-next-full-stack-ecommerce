'use client'

import { Inter } from "next/font/google";
import "./styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider } from "react-query";
import { queryClient } from "./utils/react-query";
import CartSideBar from "./components/cartSideBar";
import FormDrawerComponent from "./components/formDrawerComponent/createProduct";
import useUserStore from "./stores/userStorage";
import { useEffect } from "react";
import useCartStore from "./stores/cartStorage";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { initializeUser } = useUserStore();
  const { initializeCart } = useCartStore();

  useEffect(() => {
    initializeUser();
    initializeCart();
  }, [initializeUser]);


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <html lang="pt-BR">
          <body className={inter.className}>
            {children}
            <ToastContainer />
            <CartSideBar />
            <FormDrawerComponent />
          </body>
        </html>
      </QueryClientProvider>
    </>
  );
}
