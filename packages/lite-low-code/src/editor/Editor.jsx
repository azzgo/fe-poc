import React, { useMemo } from "react";
import CanvasPanel from "./sections/CanvasPanel";
import ConfigPanel from "./sections/ConfigPanel";
import SelectPanel from "./sections/SelectPanel";
import "./editor.css";
import { EditorEventBusContext, EditorEventBus} from "./event";

function Editor(props) {
  const { compositionList, schema = { type: "page", body: [] } } = props;

  const eventBus = useMemo(() => {
    return new EditorEventBus();
  }, []);

  return (
    <div className="editor row">
      <EditorEventBusContext.Provider value={eventBus}>
        <SelectPanel compositionList={compositionList} />
        <CanvasPanel schema={schema} />
        <ConfigPanel compositionList={compositionList} />
      </EditorEventBusContext.Provider>
    </div>
  );
}

export default Editor;
