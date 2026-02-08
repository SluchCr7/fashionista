import { toast as hotToast } from 'react-toastify';

/**
 * Professional Toast Notification System
 * Replaces all alert() calls with elegant, branded notifications
 */

const defaultOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const toast = {
  success: (message, options = {}) => {
    hotToast.success(message, {
      ...defaultOptions,
      ...options,
      className: 'toast-success',
    });
  },

  error: (message, options = {}) => {
    hotToast.error(message, {
      ...defaultOptions,
      ...options,
      className: 'toast-error',
    });
  },

  info: (message, options = {}) => {
    hotToast.info(message, {
      ...defaultOptions,
      ...options,
      className: 'toast-info',
    });
  },

  warning: (message, options = {}) => {
    hotToast.warning(message, {
      ...defaultOptions,
      ...options,
      className: 'toast-warning',
    });
  },

  loading: (message, options = {}) => {
    return hotToast.loading(message, {
      ...defaultOptions,
      autoClose: false,
      ...options,
      className: 'toast-loading',
    });
  },

  promise: (promise, messages, options = {}) => {
    return hotToast.promise(
      promise,
      {
        pending: messages.pending || 'Processing...',
        success: messages.success || 'Success!',
        error: messages.error || 'Something went wrong',
      },
      {
        ...defaultOptions,
        ...options,
      }
    );
  },

  dismiss: (toastId) => {
    hotToast.dismiss(toastId);
  },

  update: (toastId, options) => {
    hotToast.update(toastId, options);
  },
};

// Specific e-commerce toast messages with premium wording
export const ecommerceToasts = {
  addedToCart: (productName) =>
    toast.success(`✨ ${productName} has been added to your selection.`, { autoClose: 2500 }),

  removedFromCart: (productName) =>
    toast.info(`🛒 ${productName} was removed from your selection.`, { autoClose: 2500 }),

  updatedQuantity: (productName) =>
    toast.success(`✅ Your selection of ${productName} has been updated.`, { autoClose: 2500 }),

  addedToWishlist: (productName) =>
    toast.success(`⚜️ ${productName} added to your wishlist.`, { autoClose: 2500 }),

  removedFromWishlist: (productName) =>
    toast.info(`🕊️ ${productName} removed from your wishlist.`, { autoClose: 2500 }),

  orderPlaced: () =>
    toast.success('🎊 Congratulations! Your order has been placed successfully.', { autoClose: 5000 }),

  orderCancelled: () =>
    toast.info('Order successfully cancelled. We hope to see you again soon.', { autoClose: 4000 }),

  loginSuccess: (userName) =>
    toast.success(`Welcome back, ${userName}. Your exclusive access is ready.`, { autoClose: 3500 }),

  logoutSuccess: () =>
    toast.info('You have been securely logged out. Farewell for now.', { autoClose: 2500 }),

  registrationSuccess: () =>
    toast.success('👑 Welcome to the elite! Your account has been created successfully.', { autoClose: 4000 }),

  profileUpdated: () =>
    toast.success('🛡️ Profile credentials have been successfully updated.', { autoClose: 3000 }),

  passwordChanged: () =>
    toast.success('🔒 Security check complete. Password updated successfully.', { autoClose: 4000 }),

  reviewSubmitted: () =>
    toast.success('⭐ Your valuable feedback has been received. Thank you!', { autoClose: 4000 }),

  deletedReview: () =>
    toast.info('🗑️ Your review has been successfully removed.', { autoClose: 3000 }),

  invalidCredentials: () =>
    toast.error('❌ Access denied. Please verify your credentials.', { autoClose: 4000 }),

  sessionExpired: () =>
    toast.warning('⚠️ Session expired. Please sign in to continue.', { autoClose: 5000 }),

  networkError: () =>
    toast.error('🌐 Connection interrupted. Please check your network.', { autoClose: 5000 }),

  serverError: () =>
    toast.error('⚠️ Orchestrating a fix... Please try again in a moment.', { autoClose: 5000 }),

  validationError: (message) =>
    toast.warning(`🛎️ ${message}`, { autoClose: 4000 }),

  outOfStock: (productName) =>
    toast.warning(`⌛ ${productName} is currently unavailable.`, { autoClose: 4000 }),

  lowStock: (productName, quantity) =>
    toast.warning(`🔔 Only ${quantity} exquisite pieces remaining for ${productName}.`, { autoClose: 4000 }),

  discountApplied: (discount) =>
    toast.success(`🎁 Privilege applied: ${discount}% discount enabled!`, { autoClose: 4000 }),

  copiedToClipboard: () =>
    toast.success('📋 Selection details copied to clipboard.', { autoClose: 2000 }),

  cartCleared: () =>
    toast.info('🧹 Your shopping selection has been reset.', { autoClose: 3000 }),

  mustLogin: () =>
    toast.error('🔑 Please sign in to finalize your purchase.', { autoClose: 4000 }),

  emptyCartError: () =>
    toast.error('🛍️ Your selection is empty. Please add items to proceed.', { autoClose: 4000 }),
};
