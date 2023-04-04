import './reprocess';

const StorageManager = {
  /**
   * @param {string} key
   * @param {any} value
   */
  setItem(key: string, value: any): void {
    try {
      if (value && typeof value !== 'string') {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
    } catch (error) {
      console.log(`[setItem] key = ${key}, value = ${value}, error:`, { error });
    }
  },

  /**
   * @param {string} key
   */
  getItem(key: string): any {
    try {
      let data = localStorage.getItem(key);
      return data;
    } catch (error) {
      console.log(`[getItem] error: key = ${key}, error: `, { error });
    }
  },

  /**
   * @param {string} key
   */
  removeItem(key: string): any {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(`[removeItem] key = ${key}, error: `, { error });
    }
  },

  /**
   * Clear all data into local storage
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.log(`[clear] error: `, {
        error,
      });
    }
  },

  /**
   * Get local storage's size [KB] has been used
   */
  getCurrentSize(): any {
    try {
      let _lsTotal = 0,
        _xLen,
        _x;
      for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
          continue;
        }
        _xLen = (localStorage[_x].length + _x.length) * 2;
        _lsTotal += _xLen;
        // console.log(_x.substr(0, 50) + ' = ' + (_xLen / 1024).toFixed(2) + ' KB');
      }
      const result = (_lsTotal / 1024).toFixed(2);
      console.log(`%c LOCAL STORAGE have been used ==>> ${result} KB`, 'background: #222; color: #00ffff	');
      return result;
    } catch (error) {
      console.log(`[getSize] error = ${error}`);
    }
  },
};

StorageManager.getCurrentSize();

export default StorageManager;
