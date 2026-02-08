import { toast as hotToast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  TriangleAlert,
  Loader2,
  ShoppingBag,
  Heart,
  User,
  Lock,
  LogOut,
  Bell
} from 'lucide-react';

/**
 * Premium Toast UI Component
 */
const PremiumToast = ({ title, message, icon: Icon, type }) => {
  const typeStyles = {
    success: 'border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    error: 'border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400',
    info: 'border-sky-500/30 bg-sky-50/50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400',
    warning: 'border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
    loading: 'border-primary/30 bg-primary/5 dark:bg-primary/10 text-primary',
  };

  const iconColors = {
    success: 'text-emerald-500',
    error: 'text-rose-500',
    info: 'text-sky-500',
    warning: 'text-amber-500',
    loading: 'text-primary animate-spin',
  };

  return (
    <div className={`flex items-start gap-4 p-4 min-w-[320px] rounded-2xl border backdrop-blur-xl shadow-2xl transition-all ${typeStyles[type]}`}>
      <div className={`flex-shrink-0 p-2 rounded-xl bg-background/50 shadow-sm ${iconColors[type]}`}>
        <Icon size={20} />
      </div>
      <div className="flex-1 space-y-1">
        {title && <h4 className="text-sm font-black uppercase tracking-widest">{title}</h4>}
        <p className="text-xs font-medium leading-relaxed opacity-90">{message}</p>
      </div>
    </div>
  );
};

export const ifiitoast = {
  success: (message, title = 'Success') => {
    hotToast(({ closeToast }) => (
      <PremiumToast
        type="success"
        icon={CheckCircle2}
        title={title}
        message={message}
      />
    ), {
      className: 'p-0 bg-transparent shadow-none !rounded-2xl overflow-hidden',
      bodyClassName: 'p-0 m-0',
      icon: false,
      closeButton: false
    });
  },

  error: (message, title = 'Error') => {
    hotToast(({ closeToast }) => (
      <PremiumToast
        type="error"
        icon={AlertCircle}
        title={title}
        message={message}
      />
    ), {
      className: 'p-0 bg-transparent shadow-none !rounded-2xl overflow-hidden',
      bodyClassName: 'p-0 m-0',
      icon: false,
      closeButton: false
    });
  },

  info: (message, title = 'Notification') => {
    hotToast(({ closeToast }) => (
      <PremiumToast
        type="info"
        icon={Info}
        title={title}
        message={message}
      />
    ), {
      className: 'p-0 bg-transparent shadow-none !rounded-2xl overflow-hidden',
      bodyClassName: 'p-0 m-0',
      icon: false,
      closeButton: false
    });
  },

  warning: (message, title = 'Attention') => {
    hotToast(({ closeToast }) => (
      <PremiumToast
        type="warning"
        icon={TriangleAlert}
        title={title}
        message={message}
      />
    ), {
      className: 'p-0 bg-transparent shadow-none !rounded-2xl overflow-hidden',
      bodyClassName: 'p-0 m-0',
      icon: false,
      closeButton: false
    });
  },

  loading: (message, title = 'Please Wait') => {
    return hotToast(({ closeToast }) => (
      <PremiumToast
        type="loading"
        icon={Loader2}
        title={title}
        message={message}
      />
    ), {
      className: 'p-0 bg-transparent shadow-none !rounded-2xl overflow-hidden',
      bodyClassName: 'p-0 m-0',
      icon: false,
      closeButton: false,
      autoClose: false
    });
  },

  dismiss: (toastId) => hotToast.dismiss(toastId),
};

export const toast = ifiitoast;

// Premium E-commerce Preset Notifications
export const ecommerceToasts = {
  addedToCart: (productName) =>
    ifiitoast.success(`${productName} successfully added to your private selection.`, "Basket Updated"),

  removedFromCart: (productName) =>
    ifiitoast.info(`${productName} has been removed from your selection.`, "Basket Updated"),

  updatedQuantity: (productName) =>
    ifiitoast.success(`The quantity for ${productName} has been refined.`, "Basket Updated"),

  addedToWishlist: (productName) =>
    ifiitoast.success(`${productName} saved to your curated favorites.`, "Wishlist"),

  removedFromWishlist: (productName) =>
    ifiitoast.info(`${productName} has been removed from your favorites.`, "Wishlist"),

  orderPlaced: () =>
    ifiitoast.success('Your exquisite selection is now being prepared for shipment.', "Order Confirmed"),

  orderCancelled: () =>
    ifiitoast.info('The order has been successfully voided as requested.', "Order Cancelled"),

  loginSuccess: (userName) =>
    ifiitoast.success(`Welcome back, ${userName}. Your personalized experience is ready.`, "Authenticated"),

  logoutSuccess: () =>
    ifiitoast.info('Your session has been securely terminated.', "Logged Out"),

  registrationSuccess: () =>
    ifiitoast.success('Welcome to the inner circle. Your account is now active.', "Member Service"),

  profileUpdated: () =>
    ifiitoast.success('Your account credentials have been successfully refined.', "Profile Sync"),

  passwordChanged: () =>
    ifiitoast.success('Security update complete. Your new passphrase is now active.', "Secure Sync"),

  reviewSubmitted: () =>
    ifiitoast.success('Your valuable feedback has been recorded in our archives.', "Review Received"),

  deletedReview: () =>
    ifiitoast.info('Your feedback has been removed from the public record.', "Review Deleted"),

  invalidCredentials: () =>
    ifiitoast.error('Authentication failed. Please verify your private access keys.', "Access Denied"),

  sessionExpired: () =>
    ifiitoast.warning('Your session has expired for security reasons. Please re-authenticate.', "Security Breach"),

  networkError: () =>
    ifiitoast.error('Uplink failed. Please verify your connection to the grid.', "Offline"),

  serverError: () =>
    ifiitoast.error('We are currently experiencing a slight technical anomaly.', "Infrastructure Issue"),

  validationError: (message) =>
    ifiitoast.warning(message, "Validation Check"),

  outOfStock: (productName) =>
    ifiitoast.warning(`${productName} is currently unavailable in our inventory.`, "Out of Stock"),

  lowStock: (productName, quantity) =>
    ifiitoast.warning(`Only ${quantity} remaining pieces of ${productName}.`, "Limited Availability"),

  discountApplied: (discount) =>
    ifiitoast.success(`${discount}% privilege discount successfully active.`, "Offer Applied"),

  copiedToClipboard: () =>
    ifiitoast.success('Selection details have been synchronized to your clipboard.', "Data Copied"),

  cartCleared: () =>
    ifiitoast.info('Your shopping selection has been reset to default state.', "Sanitized"),

  mustLogin: () =>
    ifiitoast.error('Membership required to finalize this transaction.', "Authentication Required"),

  emptyCartError: () =>
    ifiitoast.error('Your selection is currently empty. Please add items.', "Empty Basket"),
};
