const Storage = {
  setItem(key: string, value: any) {
    if (value && typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },

  getItem(key: string): any {
    let data = localStorage.getItem(key);
    if (data) {
      data = JSON.parse(data);
    }
    return data;
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
};

export default Storage;
