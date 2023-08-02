const MINIMUM_SIZE_FILE = 0;
const MAXIMUM_SIZE_FILE = 1048576; //1 Megabytes = 1MB

const MINIMUM_PRV_BALANCE = 10 * 1e9; //10PRV

const SUPPORTED_FILE_EXTENSIONS = {
  'application/json': ['.json'],
  'application/pdf': ['.pdf'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpeg', '.jpg'],
  'text/html': ['.html', '.htm'],
};

export { MAXIMUM_SIZE_FILE, MINIMUM_PRV_BALANCE, MINIMUM_SIZE_FILE, SUPPORTED_FILE_EXTENSIONS };
