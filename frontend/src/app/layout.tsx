'use client'

import { Inter } from "next/font/google";
import "./styles/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClientProvider } from "react-query";
import { queryClient } from "./utils/react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <html lang="pt-BR">
          <body className={inter.className}>
            {children}
            <ToastContainer />
          </body>
        </html>
      </QueryClientProvider>
    </>
  );
}
