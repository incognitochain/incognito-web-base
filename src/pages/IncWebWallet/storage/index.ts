const WalletStorage = {
  setItem(key: string, value: string) {
    if (value && typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },

  getItem(key: string): any {
    try {
      let data = localStorage.getItem(key);
      return data;
    } catch (error) {
      console.log('getItem error: ', error);
      return '';
    }
  },

  removeItem(key: string) {
    localStorage.removeItem(key);
  },
};

export default WalletStorage;
