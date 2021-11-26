import React from "react";
import {Render} from "../../render";
import DragDropZone from "./components/DragDropZone";

function CanvasPanel({schema}) {

  function batchRender(renderSchema, schema) {
    return <DragDropZone schema={schema} render={renderSchema}></DragDropZone>;
  }

  return (
    <div className="canvas-panel eight columns">
      <Render schema={schema} enhance={{ batchRender }} />
    </div>
  );
}

export default CanvasPanel;
