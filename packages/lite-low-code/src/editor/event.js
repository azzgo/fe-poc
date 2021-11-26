import {cloneDeep} from "lodash-es";
import {createContext} from "react";

export class EditorEventBus {
  #activeWidgetListeners = new Set();
  #updateActiveWidgetSchemaListeners = new Set();
  #activeWidget = null;

  onAcitiveWidgetChange(listener) {
    if (!this.#activeWidgetListeners.has(listener)) {
      this.#activeWidgetListeners.add(listener)
    }

    return () => this.#activeWidgetListeners.delete(listener);
  }

  onUpdateActiveWidgetSchema(listener) {
    if (!this.#updateActiveWidgetSchemaListeners.has(listener)) {
      this.#updateActiveWidgetSchemaListeners.add(listener)
    }

    return () => this.#updateActiveWidgetSchemaListeners.delete(listener);
  }

  updateActiveWidgetSchema(schema) {
    for ( let listener of this.#updateActiveWidgetSchemaListeners.values()) {
      listener.call(null, schema);
    }
    this.setActiveWidget(schema);
  }

  setActiveWidget(schema) {
    this.#activeWidget = cloneDeep(schema);
    for (let listener of this.#activeWidgetListeners.values()) {
      listener.call(null, this.#activeWidget);
    }
  }


  getActiveWidget() {
    return this.#activeWidget;
  }

}

export const EditorEventBusContext = createContext(new EditorEventBus());

