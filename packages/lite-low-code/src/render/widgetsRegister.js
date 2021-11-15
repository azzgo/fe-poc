const widgetsRegisteredMap = new Map();

/* eslint-disable */
globalThis._debug = {
  compRegisteredMap: widgetsRegisteredMap
}

export function registerWidget({type}, Comp) {

  if (widgetsRegisteredMap.has(type)) {
    throw new Error(`type ${type} already registered.`);
  }

  widgetsRegisteredMap.set(type, Comp);

  return Comp;
}

export function resolveWidget(type) {
  return widgetsRegisteredMap.get(type);
}

export function resetWidgetsMap() {
  widgetsRegisteredMap.clear();
}
