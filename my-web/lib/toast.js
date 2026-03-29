import { toast as hotToast } from 'react-toastify';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  TriangleAlert,
  Loader2,
} from 'lucide-react';

/**
 * Modern Sleek Toast UI Component
 * Professional, simple, and highly impressive design.
 */
const SleekToast = ({ title, message, type }) => {
  const typeStyles = {
    success: { 
      icon: <CheckCircle2 className="text-emerald-500" size={18} strokeWidth={2.5} />, 
      bg: 'bg-emerald-50 dark:bg-emerald-500/10', 
      border: 'border-emerald-500/20' 
    },
    error: { 
      icon: <AlertCircle className="text-red-500" size={18} strokeWidth={2.5} />, 
      bg: 'bg-red-50 dark:bg-red-500/10', 
      border: 'border-red-500/20' 
    },
    info: { 
      icon: <Info className="text-blue-500" size={18} strokeWidth={2.5} />, 
      bg: 'bg-blue-50 dark:bg-blue-500/10', 
      border: 'border-blue-500/20' 
    },
    warning: { 
      icon: <TriangleAlert className="text-amber-500" size={18} strokeWidth={2.5} />, 
      bg: 'bg-amber-50 dark:bg-amber-500/10', 
      border: 'border-amber-500/20' 
    },
    loading: { 
      icon: <Loader2 className="text-zinc-500 animate-spin" size={18} strokeWidth={2.5} />, 
      bg: 'bg-zinc-50 dark:bg-zinc-500/10', 
      border: 'border-zinc-500/20' 
    },
  };

  const currentStyle = typeStyles[type] || typeStyles.info;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className="relative flex items-center gap-3.5 px-4 py-3.5 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] rounded-2xl w-full min-w-[320px] max-w-[400px] pointer-events-auto overflow-hidden group mb-2"
    >
      {/* Subtle background wash */}
      <div className={`absolute inset-0 ${currentStyle.bg} opacity-40 dark:opacity-20 transition-opacity duration-300`} />
      
      <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-black shadow-sm border border-black/5 dark:border-white/5 z-10 shrink-0">
        {currentStyle.icon}
      </div>
      
      <div className="flex-1 flex flex-col justify-center min-w-0 z-10">
        {title && (
          <h4 className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 leading-tight tracking-tight mb-0.5 truncate">
            {title}
          </h4>
        )}
        {message && (
          <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 leading-snug line-clamp-2">
            {message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export const ifiitoast = {
  success: (message, title = 'Success') => {
    hotToast(({ closeToast }) => (
      <SleekToast type="success" title={title} message={message} />
    ), {
      className: 'bg-transparent shadow-none p-0 !m-0',
      bodyClassName: 'p-0 m-0',
      icon: false,
      closeButton: false,
    });
  },

  error: (message, title = 'Error') => {
    hotToast(({ closeToast }) => (
      <SleekToast type="error" title={title} message={message} />
    ), {
      className: 'bg-transparent shadow-none p-0 !m-0',
      bodyClassName: 'p-0 m-0',
      icon: false,
      closeButton: false,
    });
  },

  info: (message, title = 'Notice') => {
    hotToast(({ closeToast }) => (
      <SleekToast type="info" title={title} message={message} />
    ), {
      className: 'bg-transparent shadow-none p-0 !m-0',
      bodyClassName: 'p-0 m-0',
      icon: false,
      closeButton: false,
    });
  },

  warning: (message, title = 'Warning') => {
    hotToast(({ closeToast }) => (
      <SleekToast type="warning" title={title} message={message} />
    ), {
      className: 'bg-transparent shadow-none p-0 !m-0',
      bodyClassName: 'p-0 m-0',
      icon: false,
      closeButton: false,
    });
  },

  loading: (message, title = 'Processing') => {
    return hotToast(({ closeToast }) => (
      <SleekToast type="loading" title={title} message={message} />
    ), {
      className: 'bg-transparent shadow-none p-0 !m-0',
      bodyClassName: 'p-0 m-0',
      icon: false,
      closeButton: false,
      autoClose: false,
    });
  },

  dismiss: (toastId) => hotToast.dismiss(toastId),
};

export const toast = ifiitoast;

// Premium E-commerce Preset Notifications
export const ecommerceToasts = {
  addedToCart: (productName) =>
    ifiitoast.success(`${productName} has been added to your cart.`, "Added to Cart"),

  removedFromCart: (productName) =>
    ifiitoast.info(`${productName} has been removed.`, "Cart Updated"),

  updatedQuantity: (productName) =>
    ifiitoast.success(`Quantity for ${productName} has been updated.`, "Cart Updated"),

  addedToWishlist: (productName) =>
    ifiitoast.success(`${productName} saved to your favorites.`, "Saved"),

  removedFromWishlist: (productName) =>
    ifiitoast.info(`${productName} removed from favorites.`, "Removed"),

  orderPlaced: () =>
    ifiitoast.success('Your order is being processed.', "Order Confirmed"),

  orderCancelled: () =>
    ifiitoast.info('Your order has been cancelled successfully.', "Order Cancelled"),

  loginSuccess: (userName) =>
    ifiitoast.success(`Welcome back, ${userName}.`, "Signed In"),

  logoutSuccess: () =>
    ifiitoast.info('You have securely logged out.', "Signed Out"),

  registrationSuccess: () =>
    ifiitoast.success('Your account has been created successfully.', "Welcome"),

  profileUpdated: () =>
    ifiitoast.success('Your profile has been updated.', "Profile Saved"),

  passwordChanged: () =>
    ifiitoast.success('Your password has been changed successfully.', "Security Updated"),

  reviewSubmitted: () =>
    ifiitoast.success('Thank you for your feedback.', "Review Submitted"),

  deletedReview: () =>
    ifiitoast.info('Your review has been removed.', "Review Deleted"),

  invalidCredentials: () =>
    ifiitoast.error('Incorrect email or password. Please try again.', "Sign In Failed"),

  sessionExpired: () =>
    ifiitoast.warning('Your session has expired. Please sign in again.', "Session Expired"),

  networkError: () =>
    ifiitoast.error('Please check your internet connection.', "Network Error"),

  serverError: () =>
    ifiitoast.error('We are experiencing technical difficulties.', "Server Error"),

  validationError: (message) =>
    ifiitoast.warning(message, "Validation Error"),

  outOfStock: (productName) =>
    ifiitoast.warning(`${productName} is currently out of stock.`, "Out of Stock"),

  lowStock: (productName, quantity) =>
    ifiitoast.warning(`Only ${quantity} remaining for ${productName}.`, "Low Stock"),

  discountApplied: (discount) =>
    ifiitoast.success(`${discount}% discount applied to your cart.`, "Discount Applied"),

  copiedToClipboard: () =>
    ifiitoast.success('Copied to your clipboard.', "Copied"),

  cartCleared: () =>
    ifiitoast.info('Your cart has been cleared.', "Cart Cleared"),

  mustLogin: () =>
    ifiitoast.error('Please sign in to continue.', "Authentication Required"),

  emptyCartError: () =>
    ifiitoast.error('Your cart is empty. Please add items.', "Empty Cart"),
};
