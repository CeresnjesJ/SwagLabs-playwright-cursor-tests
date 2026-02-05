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
} as const;
