import React from "react";
import CanvasPanel from "./sections/CanvasPanel";
import ConfigPanel from "./sections/ConfigPanel";
import SelectPanel from "./sections/SelectPanel";
import "./editor.css";

function Editor(props) {
  const {
    compositionList,
    schema = { type: "page", body: [] },
  } = props;

  return (
    <div className="editor row">
      <SelectPanel compositionList={compositionList} />
      <CanvasPanel schema={schema} />
      <ConfigPanel />
    </div>
  );
}

export default Editor;
