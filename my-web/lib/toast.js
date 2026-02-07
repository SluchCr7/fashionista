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

// Specific e-commerce toast messages
export const ecommerceToasts = {
  addedToCart: (productName) => 
    toast.success(`✅ ${productName} added to cart`, { autoClose: 2000 }),
  
  removedFromCart: (productName) => 
    toast.info(`🗑️ ${productName} removed from cart`, { autoClose: 2000 }),
  
  updatedQuantity: (productName) => 
    toast.success(`✅ Updated quantity for ${productName}`, { autoClose: 2000 }),
  
  addedToWishlist: (productName) => 
    toast.success(`❤️ ${productName} added to wishlist`, { autoClose: 2000 }),
  
  removedFromWishlist: (productName) => 
    toast.info(`💔 ${productName} removed from wishlist`, { autoClose: 2000 }),
  
  orderPlaced: () => 
    toast.success('🎉 Order placed successfully!', { autoClose: 4000 }),
  
  orderCancelled: () => 
    toast.info('Order cancelled', { autoClose: 3000 }),
  
  loginSuccess: (userName) => 
    toast.success(`Welcome back, ${userName}!`, { autoClose: 3000 }),
  
  logoutSuccess: () => 
    toast.info('Logged out successfully', { autoClose: 2000 }),
  
  registrationSuccess: () => 
    toast.success('🎉 Account created successfully!', { autoClose: 3000 }),
  
  profileUpdated: () => 
    toast.success('✅ Profile updated successfully', { autoClose: 2000 }),
  
  passwordChanged: () => 
    toast.success('🔒 Password changed successfully', { autoClose: 3000 }),
  
  reviewSubmitted: () => 
    toast.success('⭐ Review submitted successfully', { autoClose: 3000 }),
  
  invalidCredentials: () => 
    toast.error('❌ Invalid email or password', { autoClose: 3000 }),
  
  sessionExpired: () => 
    toast.warning('⚠️ Session expired. Please login again', { autoClose: 4000 }),
  
  networkError: () => 
    toast.error('🌐 Network error. Please check your connection', { autoClose: 4000 }),
  
  serverError: () => 
    toast.error('⚠️ Server error. Please try again later', { autoClose: 4000 }),
  
  validationError: (message) => 
    toast.warning(`⚠️ ${message}`, { autoClose: 3000 }),
  
  outOfStock: (productName) => 
    toast.warning(`⚠️ ${productName} is out of stock`, { autoClose: 3000 }),
  
  lowStock: (productName, quantity) => 
    toast.warning(`⚠️ Only ${quantity} left for ${productName}`, { autoClose: 3000 }),
  
  discountApplied: (discount) => 
    toast.success(`🎁 ${discount}% discount applied!`, { autoClose: 3000 }),
  
  copiedToClipboard: () => 
    toast.success('📋 Copied to clipboard', { autoClose: 1500 }),
};
