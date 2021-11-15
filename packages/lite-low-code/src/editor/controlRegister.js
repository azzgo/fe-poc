
const controlRegisterMap = new Map();

/* eslint-disable */
globalThis._debug = {
  compRegisteredMap
}

export function registerComp({type}, Comp) {

  if (compRegisteredMap.has(type)) {
    throw new Error(`type ${type} already registered.`);
  }

  compRegisteredMap.set(type, Comp);

  return Comp;
}

export function resolveComp(type) {
  return compRegisteredMap.get(type);
}

export function resetCompMap() {
  compRegisteredMap.clear();
}
