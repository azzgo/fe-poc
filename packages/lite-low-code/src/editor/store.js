import {createContext} from "react";

export class EditorStore {
  #schema = null;
  #activeWidgetIdListeners = new Set();
  #widgetSchemaListenersMap = new Map();
  #activeWidgetId = null;

  constructor(schema) {
    this.#schema = schema;
  }

  onWidgetSchemaChange(id, listener) {
    let listeners = this.#widgetSchemaListenersMap.get(id);
    if (!listeners) {
      listeners = new Set();
      this.#widgetSchemaListenersMap.set(id, listeners);
    }

    if (!listeners.has(listener)) {
      listeners.add(listener);
    }

    return () => listeners.delete(listener);
  }

  updateActiveWidgetSchema(schema) {
    if (!this.#widgetSchemaListenersMap.has(schema.id)) {
      return;
    }
    for ( let listener of this.#widgetSchemaListenersMap.get(schema.id).values()) {
      listener.call(null, schema);
    }
  }

  setActiveWidgetId(id) {
    this.#activeWidgetId = id;
    for (let listener of this.#activeWidgetIdListeners.values()) {
      listener.call(null, this.#activeWidgetId);
    }
  }

  onAcitiveWidgetIdChange(listener) {
    if (!this.#activeWidgetIdListeners.has(listener)) {
      this.#activeWidgetIdListeners.add(listener)
    }

    return () => this.#activeWidgetIdListeners.delete(listener);
  }


  getActiveWidget() {
    return searchSchemaById(this.#schema, this.#activeWidgetId);
  }

  getSchema() {
    return this.#schema;
  }

}

export const EditorStoreContext = createContext(new EditorStore());

export function searchSchemaById(schema, id) {
  if (schema?.id === id) {
    return schema;
  }

  for (let prop of Object.keys(schema)) {
    if (typeof schema[prop] === 'object') {
      const result = searchSchemaById(schema[prop], id);
      if (result) return result;
    }
  }

  return null;
}
