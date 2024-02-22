import { isLocalHost } from 'config';

if (!isLocalHost) {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

// replace console.* for disable log on production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

export {};
