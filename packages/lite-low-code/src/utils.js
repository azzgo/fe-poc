import AzzStorage from "azz-storage";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React, Vue and Svelte

// Create an instance of Notyf
export const notyf = new Notyf({position: {x: 'right', y: 'top'}});

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
