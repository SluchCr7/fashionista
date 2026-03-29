import { Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { memo } from 'react';

const Notify = memo(({ Notify: message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
           initial={{ opacity: 0, y: -40, scale: 0.95 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           exit={{ opacity: 0, y: -20, scale: 0.95 }}
           transition={{ type: "spring", stiffness: 400, damping: 25 }}
           className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 bg-white/95 dark:bg-[#111111]/95 text-zinc-900 dark:text-zinc-100 px-3.5 py-2 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-black/5 dark:border-white/10 backdrop-blur-xl pointer-events-none"
        >
          <div className="w-5 h-5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
            <Info size={12} strokeWidth={2.5} className="text-blue-500" />
          </div>
          <p className="text-[13px] font-semibold tracking-tight pr-2">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Notify.displayName = "Notify";

export default Notify;