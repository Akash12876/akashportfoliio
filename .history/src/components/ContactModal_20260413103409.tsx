import { AnimatePresence, motion } from "framer-motion";

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [showThankYou, setShowThankYou] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', agree: false });
  const [touched, setTouched] = useState<{[k: string]: boolean}>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let checked: boolean | undefined = undefined;
    if (type === "checkbox" && "checked" in e.target) {
      checked = (e.target as HTMLInputElement).checked;
    }
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched(t => ({ ...t, [e.target.name]: true }));
  };
  const isValid = form.name && form.phone && form.email && form.agree;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
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
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`rounded-lg px-4 py-2 bg-zinc-800 text-white placeholder-white/60 border ${touched.name && !form.name ? 'border-red-500' : 'border-zinc-700'} focus:border-purple-400 outline-none`}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Contact Number"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`rounded-lg px-4 py-2 bg-zinc-800 text-white placeholder-white/60 border ${touched.phone && !form.phone ? 'border-red-500' : 'border-zinc-700'} focus:border-purple-400 outline-none`}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`rounded-lg px-4 py-2 bg-zinc-800 text-white placeholder-white/60 border ${touched.email && !form.email ? 'border-red-500' : 'border-zinc-700'} focus:border-purple-400 outline-none`}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="rounded-lg px-4 py-2 bg-zinc-800 text-white placeholder-white/60 border border-zinc-700 focus:border-purple-400 outline-none resize-none min-h-[80px]"
                />
                <label className="flex items-center gap-2 text-white/80 text-sm select-none">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="accent-purple-400 w-5 h-5 rounded border border-zinc-700 focus:ring-2 focus:ring-purple-400"
                    required
                  />
                  <span>I confirm all details are correct <span className="text-purple-400">&#10003;</span></span>
                </label>
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-purple-400 hover:bg-purple-500 text-white font-bold py-3 transition-all disabled:opacity-60"
                  disabled={!isValid}
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import { useState } from "react";
