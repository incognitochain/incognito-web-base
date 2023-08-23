const MINIMUM_SIZE_FILE = 0;
const MAXIMUM_FILE_SIZE = 500 * 1024; //1KB = 1024bytes
const MINIMUM_PRV_BALANCE = 10 * 1e9; //10PRV

const SUPPORTED_FILE_EXTENSIONS = {
  'application/json': ['.json'],
  'application/pdf': ['.pdf'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpeg', '.jpg'],
  'text/html': ['.html', '.htm'],
};

export { MAXIMUM_FILE_SIZE, MINIMUM_PRV_BALANCE, MINIMUM_SIZE_FILE, SUPPORTED_FILE_EXTENSIONS };
