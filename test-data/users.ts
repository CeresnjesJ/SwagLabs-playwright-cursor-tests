export const USERS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  LOCKED: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  PROBLEM: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  PERFORMANCE: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
  ERROR: {
    username: 'error_user',
    password: 'secret_sauce',
  },
  VISUAL: {
    username: 'visual_user',
    password: 'secret_sauce',
  },
} as const;

export const PRODUCTS = {
  BACKPACK: 'Sauce Labs Backpack',
  BIKE_LIGHT: 'Sauce Labs Bike Light',
  BOLT_T_SHIRT: 'Sauce Labs Bolt T-Shirt',
  FLEECE_JACKET: 'Sauce Labs Fleece Jacket',
  ONESIE: 'Sauce Labs Onesie',
  RED_T_SHIRT: 'Test.allTheThings() T-Shirt (Red)',
} as const;

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
  LOCKED_USER: 'Epic sadface: Sorry, this user has been locked out.',
  REQUIRED_USERNAME: 'Epic sadface: Username is required',
  REQUIRED_PASSWORD: 'Epic sadface: Password is required',
  FIRST_NAME_REQUIRED: 'First Name is required',
  LAST_NAME_REQUIRED: 'Last Name is required',
  POSTAL_CODE_REQUIRED: 'Postal Code is required',
} as const;

export const PAGE_TITLES = {
  PRODUCTS: 'Products',
  CART: 'Your Cart',
  CHECKOUT_INFO: 'Checkout: Your Information',
  CHECKOUT_OVERVIEW: 'Checkout: Overview',
  CHECKOUT_COMPLETE: 'Checkout: Complete!',
} as const;

export const URLS = {
  LOGIN: '/',
  INVENTORY: '/inventory.html',
  CART: '/cart.html',
  CHECKOUT_STEP_ONE: '/checkout-step-one.html',
  CHECKOUT_STEP_TWO: '/checkout-step-two.html',
} as const;

