import React, { useRef, useState } from "react";
import Editor from "./editor/Editor";
import { lcStore } from "./utils";

function EditorPage() {
  const editorRef = useRef(null);

  const compositionList = [
    {
      name: "Single Line Input",
      key: "text-input",
      schema: {
        type: "input",
        label: "Single Line Input",
      },
    },
    {
      name: "Columns",
      key: "columns",
      schema: {
        type: "columns",
        columns: [[], []],
      },
    },
    {
      name: "Template",
      key: "template",
      schema: {
        type: "tpl",
        tpl: "Hello World",
      },
    },
  ];

  const [schema, setSchema] = useState(lcStore.get('schema', {type: 'page', body: []}));

  function onSaveSchema() {
    const schema = editorRef.current.getSchema();

    if (schema) {
      lcStore.set('schema', schema);
    }
  }

  function onClearSchema() {
    setSchema({ type: "page", body: [] });
  }

  return (
    <div className="full-height flex-column">
      <div className="row ">
        <button onClick={onSaveSchema} className="button button-primary">
          Save Schema
        </button>
        <button onClick={onClearSchema} className="button">
          clear Schema
        </button>
      </div>
      <div className="flex-auto">
        <Editor
          ref={editorRef}
          schema={schema}
          compositionList={compositionList}
        />
        ;
      </div>
    </div>
  );
}

export default EditorPage;
