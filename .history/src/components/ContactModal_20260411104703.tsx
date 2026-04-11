
export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [showThankYou, setShowThankYou] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      onClose();
    }, 1800);
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100vw", opacity: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-zinc-900 rounded-2xl shadow-2xl p-8 max-w-md w-full relative border border-purple-400"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/70 hover:text-purple-400 text-2xl font-bold focus:outline-none"
              aria-label="Close"
            >
              &times;
            </button>
            <AnimatePresence>
              {showThankYou ? (
                <motion.div
                  key="thankyou"
                  initial={{ y: -80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -80, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 90, damping: 16 }}
                  className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-zinc-900/95 rounded-2xl z-20"
                >
                  <h2 className="text-2xl font-extrabold text-purple-400 mb-2">Thank You!</h2>
                  <p className="text-white/80">Your message has been sent.</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <div className={showThankYou ? "pointer-events-none opacity-40" : ""}>
              <h2 className="text-2xl font-extrabold text-purple-400 mb-4">Let&apos;s Collaborate!</h2>
              <p className="text-white/80 mb-6">Fill out the form below and I&apos;ll get back to you soon.</p>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Your Name" className="rounded-lg px-4 py-2 bg-zinc-800 text-white placeholder-white/60 border border-zinc-700 focus:border-purple-400 outline-none" required />
                <input type="email" placeholder="Your Email" className="rounded-lg px-4 py-2 bg-zinc-800 text-white placeholder-white/60 border border-zinc-700 focus:border-purple-400 outline-none" required />
                <textarea placeholder="Your Message" className="rounded-lg px-4 py-2 bg-zinc-800 text-white placeholder-white/60 border border-zinc-700 focus:border-purple-400 outline-none resize-none min-h-[80px]" required />
                <button type="submit" className="mt-2 rounded-full bg-purple-400 hover:bg-purple-500 text-white font-bold py-3 transition-all">Send Message</button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import { useState } from "react";
