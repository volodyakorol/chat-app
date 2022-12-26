/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

// Allow router mocks.
// eslint-disable-next-line no-undef
jest.mock('next/router', () => require('next-router-mock'));
jest.mock('@/shared/asset/google-icon.svg', () => 'svg');

window.setImmediate = window.setTimeout;
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

