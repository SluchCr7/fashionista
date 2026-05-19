import { toast as hotToast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Check, X, Info, AlertTriangle, Loader2 } from 'lucide-react';

/**
 * Editorial Luxury Toast UI Component
 * Ultra-minimalist, high-end design matching the new Atelier aesthetic.
 */
const EditorialToast = ({ title, message, type }) => {
  const typeConfig = {
    success: { 
      icon: <Check size={14} strokeWidth={2} />, 
      dotColor: 'bg-green-500'
    },
    error: { 
      icon: <X size={14} strokeWidth={2} />, 
      dotColor: 'bg-red-500'
    },
    info: { 
      icon: <Info size={14} strokeWidth={2} />, 
      dotColor: 'bg-black dark:bg-white'
    },
    warning: { 
      icon: <AlertTriangle size={14} strokeWidth={2} />, 
      dotColor: 'bg-orange-500'
    },
    loading: { 
      icon: <Loader2 size={14} strokeWidth={2} className="animate-spin" />, 
      dotColor: 'bg-black/20 dark:bg-white/20'
    },
  };

  const current = typeConfig[type] || typeConfig.info;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative flex flex-col justify-center px-6 py-5 bg-white dark:bg-[#0a0a0a] border border-black dark:border-white shadow-[10px_10px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_rgba(255,255,255,1)] w-[360px] pointer-events-auto overflow-hidden group mb-4 transition-colors"
    >
      <div className="flex items-start justify-between mb-3 border-b border-black/10 dark:border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-1.5 rounded-full ${current.dotColor} animate-pulse`} />
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-black dark:text-white leading-none">
            {title}
          </h4>
        </div>
        <div className="text-black/40 dark:text-white/40">
           {current.icon}
        </div>
      </div>
      
      {message && (
        <p className="text-sm font-serif italic text-black/70 dark:text-white/70 leading-relaxed pr-4">
          {message}
        </p>
      )}
    </motion.div>
  );
};

export const ifiitoast = {
  success: (message, title = 'Confirmed') => {
    hotToast(({ closeToast }) => (
      <EditorialToast type="success" title={title} message={message} />
    ), {
      className: 'bg-transparent shadow-none p-0 !m-0 overflow-visible',
      bodyClassName: 'p-0 m-0 overflow-visible',
      icon: false,
      closeButton: false,
    });
  },

  error: (message, title = 'Error') => {
    hotToast(({ closeToast }) => (
      <EditorialToast type="error" title={title} message={message} />
    ), {
      className: 'bg-transparent shadow-none p-0 !m-0 overflow-visible',
      bodyClassName: 'p-0 m-0 overflow-visible',
      icon: false,
      closeButton: false,
    });
  },

  info: (message, title = 'Notice') => {
    hotToast(({ closeToast }) => (
      <EditorialToast type="info" title={title} message={message} />
    ), {
      className: 'bg-transparent shadow-none p-0 !m-0 overflow-visible',
      bodyClassName: 'p-0 m-0 overflow-visible',
      icon: false,
      closeButton: false,
    });
  },

  warning: (message, title = 'Warning') => {
    hotToast(({ closeToast }) => (
      <EditorialToast type="warning" title={title} message={message} />
    ), {
      className: 'bg-transparent shadow-none p-0 !m-0 overflow-visible',
      bodyClassName: 'p-0 m-0 overflow-visible',
      icon: false,
      closeButton: false,
    });
  },

  loading: (message, title = 'Processing') => {
    return hotToast(({ closeToast }) => (
      <EditorialToast type="loading" title={title} message={message} />
    ), {
      className: 'bg-transparent shadow-none p-0 !m-0 overflow-visible',
      bodyClassName: 'p-0 m-0 overflow-visible',
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
    ifiitoast.success(`${productName} added to your bag.`, "Item Added"),

  removedFromCart: (productName) =>
    ifiitoast.info(`${productName} removed from your bag.`, "Bag Updated"),

  updatedQuantity: (productName) =>
    ifiitoast.success(`Quantity updated for ${productName}.`, "Bag Updated"),

  addedToWishlist: (productName) =>
    ifiitoast.success(`${productName} saved to your Wishlist.`, "Saved"),

  removedFromWishlist: (productName) =>
    ifiitoast.info(`${productName} removed from your Wishlist.`, "Removed"),

  orderPlaced: () =>
    ifiitoast.success('Your order has been placed successfully.', "Order Confirmed"),

  orderCancelled: () =>
    ifiitoast.info('Your order has been cancelled.', "Order Cancelled"),

  loginSuccess: (userName) =>
    ifiitoast.success(`Welcome back, ${userName}.`, "Signed In"),

  logoutSuccess: () =>
    ifiitoast.info('You have been securely logged out.', "Signed Out"),

  registrationSuccess: () =>
    ifiitoast.success('Your account has been created successfully.', "Welcome"),

  profileUpdated: () =>
    ifiitoast.success('Your profile details have been saved.', "Profile Updated"),

  passwordChanged: () =>
    ifiitoast.success('Your password has been changed successfully.', "Security Updated"),

  reviewSubmitted: () =>
    ifiitoast.success('Thank you for your feedback.', "Review Submitted"),

  deletedReview: () =>
    ifiitoast.info('Your review has been deleted.', "Review Deleted"),

  invalidCredentials: () =>
    ifiitoast.error('Incorrect email or password. Please try again.', "Sign In Failed"),

  sessionExpired: () =>
    ifiitoast.warning('Your session expired. Please sign in again.', "Session Expired"),

  networkError: () =>
    ifiitoast.error('Please check your internet connection and try again.', "Network Error"),

  serverError: () =>
    ifiitoast.error('We are experiencing technical difficulties.', "System Error"),

  validationError: (message) =>
    ifiitoast.warning(message, "Action Failed"),

  outOfStock: (productName) =>
    ifiitoast.warning(`${productName} is currently out of stock.`, "Unavailable"),

  lowStock: (productName, quantity) =>
    ifiitoast.warning(`Only ${quantity} remaining in stock.`, "Low Stock"),

  discountApplied: (discount) =>
    ifiitoast.success(`${discount}% discount applied to your order.`, "Discount Applied"),

  copiedToClipboard: () =>
    ifiitoast.success('Link copied to clipboard.', "Copied"),

  cartCleared: () =>
    ifiitoast.info('Your bag has been emptied.', "Bag Cleared"),

  mustLogin: () =>
    ifiitoast.error('Please sign in to continue.', "Authentication Required"),

  emptyCartError: () =>
    ifiitoast.error('Your bag is empty.', "Cannot Proceed"),
};
