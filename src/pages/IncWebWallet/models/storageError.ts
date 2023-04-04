import { StorageManager } from 'storage';
import JSONHelper from 'utils/jsonHelper';

const getKeyStorageError = () => {
  return '$STORAGE_ERROR_LOAD_WALLET';
};

export const getStorageLoadWalletError = async () => {
  const key = getKeyStorageError();
  const result = (await StorageManager.getItem(key)) || '[]';
  return JSONHelper.isJsonString(result) && JSON.parse(result);
};

export const setStorageLoadWalletError = async (data: any) => {
  const key = getKeyStorageError();
  await StorageManager.setItem(key, JSON.stringify(data));
};
