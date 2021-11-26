import JsonEditor from "jsoneditor";
import React, { useEffect, useState } from "react";
import { Render } from "./render";
import { useRef } from "react";
import "./widgets";
import { lcStore } from "./utils";

function RenderPage() {
  const jsoneditor = useRef(null);
  const [schema, setSchema] = useState(lcStore.get("schema", { type: "page" }));

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
      lcStore.set("schema", schema);
    }
  };

  const onReset = () => {
    setSchema({ type: "page" });
    jsoneditor.current.set({ type: "page" });
  };

  return (
    <div className="App row full-height">
      <div>
        <Render schema={schema} />
      </div>
      <hr />
      <h4>Schema 编辑器</h4>
      <div>
        <div className="row">
          <button className="button button-primary" onClick={onSave}>
            save
          </button>
          <button className="button" onClick={onReset}>
            reset
          </button>
        </div>
        <div id="jsoneditor" />
      </div>
    </div>
  );
}

export default RenderPage;
