export const parseError = (error: any) => {
  let errorMessage = 'Something Went Wrong.';
  if (!error) errorMessage = '';
  else if (typeof error === 'string') errorMessage = error;
  else if (typeof error.message === 'string') errorMessage = error.message;
  else if (typeof error.Message === 'string') errorMessage = error.Message;
  else if (typeof error.MESSAGE === 'string') errorMessage = error.MESSAGE;
  return errorMessage;
};
