import { motion, AnimatePresence } from 'framer-motion';
import { memo } from 'react';

const Notify = memo(({ Notify: message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: 50 }}
           transition={{ type: "spring", stiffness: 400, damping: 30 }}
           className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[9999] flex items-center justify-center gap-4 bg-black dark:bg-white text-white dark:text-black px-6 py-4 border-none shadow-2xl pointer-events-none"
        >
          <div className="w-2 h-2 rounded-full bg-white dark:bg-black animate-pulse" />
          <p className="text-[11px] font-black uppercase tracking-[0.3em]">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Notify.displayName = "Notify";

export default Notify;