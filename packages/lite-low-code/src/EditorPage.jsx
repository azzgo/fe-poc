import React from "react";
import Editor from "./editor/Editor";

function EditorPage() {

  const compositionList = [
    {
      name: "Single Line Input",
      key: "text-input",
      schema: {
        type: 'input',
        label: "Single Line Input"
      },
    },
    {
      name: "Columns",
      key: "columns",
      schema: {
        type: 'columns',
        columns: [[], []]
      }
    },
    {
      name: "Template",
      key: "template",
      schema: {
        type: 'tpl',
        tpl: "Hello World"
      }
    },
  ]

  return  (
    <div className="full-height flex-column">
      <div className="row ">
        <button className="button button-primary">Save Schema</button>
      </div>
      <div className="flex-auto">
        <Editor compositionList={compositionList} />;
      </div>
    </div>
  )

}

export default EditorPage;
