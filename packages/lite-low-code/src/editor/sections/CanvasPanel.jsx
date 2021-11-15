import {cloneDeep} from "lodash";
import React, {useState} from "react";
import { Render } from "../../render";
import DragDropZone from "./components/DragDropZone";

function CanvasPanel({schema}) {
  const [, forceUpdate] = useState({});

  function batchRender(renderSchema, schema) {
    const appendSchema = (item) => {
      schema.push(cloneDeep(item));
      forceUpdate({});
    };
    return <DragDropZone onAppend={appendSchema}>{schema.map(renderSchema)}</DragDropZone>;
  }

  return (
    <div className="col-xs">
      <Render schema={schema} enhance={{ batchRender }} />
    </div>
  );
}

export default CanvasPanel;
