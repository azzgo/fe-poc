import AzzStorage from "azz-storage";

const jsonParser: IAzzStorageParser = {
  get(val, defaultVal) {
    try {
      const data = JSON.parse(val);
      return data.value;
    } catch (e) {
      return defaultVal;
    }
  },
  set(val) {
    return JSON.stringify({
      value: val,
    });
  },
};

export const lcStore = new AzzStorage("lc-", jsonParser);
