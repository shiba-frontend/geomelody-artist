"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimation, useInView, Variants } from "framer-motion";
import { usePathname } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  1. usePageTransition                                              */
/*  Returns a `key` you can hand to <motion.div key={key}> inside     */
/*  <AnimatePresence>, plus ready-made page variants.                 */
/* ------------------------------------------------------------------ */

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25, ease: "easeInOut" },
  },
};

export function usePageTransition() {
  const pathname = usePathname();
  return { key: pathname, variants: pageVariants };
}

/* ------------------------------------------------------------------ */
/*  2. useSectionInView                                                */
/*  Drives whileInView-style animation via imperative controls, so    */
/*  you can also trigger/reset it manually if needed.                 */
/* ------------------------------------------------------------------ */

export const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

interface UseSectionInViewOptions {
  once?: boolean;
  amount?: number; // 0 - 1, how much of the element must be visible
}

export function useSectionInView({
  once = true,
  amount = 0.2,
}: UseSectionInViewOptions = {}) {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once, amount });

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, once, controls]);

  return { ref, controls, variants: sectionVariants };
}

/* ------------------------------------------------------------------ */
/*  3. useStaggerContainer                                             */
/*  For grids/lists of items that should animate in sequence.         */
/* ------------------------------------------------------------------ */

export const staggerContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function useStaggerContainer({
  once = true,
  amount = 0.2,
}: UseSectionInViewOptions = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView) setHasAnimated(true);
  }, [isInView]);

  return {
    ref,
    animate: hasAnimated ? "show" : "hidden",
    containerVariants: staggerContainerVariants,
    itemVariants: staggerItemVariants,
  };
}