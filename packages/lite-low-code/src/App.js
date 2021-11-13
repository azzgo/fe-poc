import JsonEditor from "jsoneditor";
import AzzStorage from "azz-storage";
import React, { useEffect, useState } from "react";
import { Render } from "./render";
import { useRef } from "react";
import './widgets'

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

const lcStore = new AzzStorage("lc-", jsonParser);

function App() {
  const jsoneditor = useRef(null);
  const [schema, setSchema] = useState(lcStore.get('schema', { type: "page" }));

  useEffect(() => {
    if (!jsoneditor.current) {
      jsoneditor.current = new JsonEditor(
        document.getElementById("jsoneditor"),
        { mode: "code", modes: ["code", "tree", "view"] }
      );
      jsoneditor.current.set(schema);
    }
  /* eslint-disable-next-line */
  }, []);

  const onSave = () => {
    const schema = jsoneditor.current.get();
    if (schema) {
      setSchema(jsoneditor.current.get());
      lcStore.set('schema', schema);
    }
  };

  const onReset = () => {
    setSchema({ type: "page" });
    jsoneditor.current.set({ type: "page" });
  };

  return (
    <div className="App row full-height">
      <div className="col-xs-6">
        <Render schema={schema} />
      </div>
      <div className="col-xs-6">
        <div className="row">
          <button onClick={onSave}>save</button>
          <button onClick={onReset}>reset</button>
        </div>
        <div id="jsoneditor" />
      </div>
    </div>
  );
}

export default App;
