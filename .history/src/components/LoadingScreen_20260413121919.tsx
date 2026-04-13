import React from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [displayed, setDisplayed] = React.useState("");
  const text = "Welcome to Akash Portfolio";

  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white text-2xl font-mono"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span>{displayed}</span>
    </motion.div>
  );
}
