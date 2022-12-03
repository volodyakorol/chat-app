/* eslint-disable no-console */
import { showLogger } from '@/shared/constant/env';

/**
 * A logger function that will only logs on development
 * @param object - The object to log
 * @param comment - Autogenerated with `lg` snippet
 */

export const logger = (data: unknown, comment = '') => {
  if (!showLogger) return;
  const location = typeof window !== 'undefined' && window?.location.pathname;

  console.log('%c ============== INFO LOG', 'color: #0096C7');
  console.log(`%c location: ${location}`, 'color: #4A4E69');
  console.log(`%c comment: ${comment}`, 'color: #22223B');
  console.log(data);
};
