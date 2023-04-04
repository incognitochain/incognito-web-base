function isJsonString(str: any) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const JSONHelper = {
  isJsonString,
};

export default JSONHelper;
