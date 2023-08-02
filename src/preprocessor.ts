// replace console.* for disable log on production
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

if (process.env.NODE_ENV === 'development') {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

export {};
