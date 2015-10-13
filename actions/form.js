
/**
 * Constants
 */

export const RESET_TRANSACTION_FORM = 'RESET_TRANSACTION_FORM';
export const APPEND_TRANSACTION_FORM = 'APPEND_TRANSACTION_FORM';

export const RESET_LOGIN_FORM = 'RESET_LOGIN_FORM';
export const APPEND_LOGIN_FORM = 'APPEND_LOGIN_FORM';

/**
 * Reset transaction form
 */

export function resetTransactionForm() {
  return {
    type: RESET_TRANSACTION_FORM
  };
}


/**
 * Append field in transaction form
 */

export function appendTransactionForm(attributes) {
  return {
    type: APPEND_TRANSACTION_FORM,
    attributes,
  };
}

/**
 * Reset Login form
 */

export function resetLoginForm() {
  return {
    type: RESET_LOGIN_FORM
  };
}

/**
 * Append field in login form
 */

export function appendLoginForm(attributes) {
  return {
    type: APPEND_LOGIN_FORM,
    attributes,
  };
}