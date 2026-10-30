import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StoreProvider from "../redux/StoreProvider";
import "@/assets/globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const metadata: Metadata = {
  title: {
    default: "Artist Portal",
    template: "%s | Artist Portal",
  },
  description: "Artist management and music distribution platform",
  keywords: ["artist", "music", "albums", "analytics"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    >
       <head>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Odibee+Sans&display=swap" rel="stylesheet"></link>
      </head>
      <body className="min-h-full flex flex-col">
        <StoreProvider>
         <ReactQueryProvider>{children}</ReactQueryProvider>
       <ToastContainer autoClose={3000} position="top-right" theme="dark" />
          
        </StoreProvider>
      </body>
    </html>
  );
}
