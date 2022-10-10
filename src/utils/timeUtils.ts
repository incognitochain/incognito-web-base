const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const convertISOtoMMYYYY = (timeIOSString: string) => {
  if (!timeIOSString || timeIOSString.length < 1) return '';
  const date = new Date(timeIOSString);
  return MONTHS[date.getMonth()] + ' ' + date.getFullYear();
};

export { convertISOtoMMYYYY };
