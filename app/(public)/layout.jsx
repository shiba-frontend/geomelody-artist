"use client";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import { usePathname } from "next/navigation";
import { usePageTransition } from "../../hooks/usetransition";
import { motion, AnimatePresence } from "framer-motion";
export default function PublicLayout({ children }) {

    const { key, variants } = usePageTransition();

     const pathname = usePathname();
  const hideHeaderFooter = pathname === "/login" || pathname === "/signup" || pathname === "/verify";

  return (
    <AnimatePresence mode="wait">
        {!hideHeaderFooter && <Header />}
     <motion.div key={key} variants={variants} initial="initial" animate="animate" exit="exit">
      <main>
        {children}
      </main>
     {!hideHeaderFooter && <Footer />}
      </motion.div>
     
     </AnimatePresence>
    
   
  );
}