'use client'

import "./styles/globals.css";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import useUserStore from "./stores/userStorage";
import useCartStore from "./stores/cartStorage";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./utils/react-query";
import CartSideBar from "./components/cartSideBar";
import FormDrawerComponent from "./components/formDrawer/createProduct";

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
