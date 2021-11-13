import React from "react";
import ReactDOM from "react-dom";
import "./flexboxgrid.css";
import "jsoneditor/dist/jsoneditor.css";
import "./index.css";
import Navigo from "navigo";
import RenderPage from "./RenderPage";
import EditorPage from "./EditorPage";

const router = new Navigo("/", { hash: true });

router
  .on(
    "/editor",
    () => {
      ReactDOM.render(
        <React.StrictMode>
          <EditorPage />
        </React.StrictMode>,
        document.getElementById("root")
      );
    },
    {
      leave: (done) => {
        ReactDOM.render(null, document.getElementById("root"));
        done();
      },
    }
  )
  .on(
    "/render",
    () => {
      ReactDOM.render(
        <React.StrictMode>
          <RenderPage />
        </React.StrictMode>,
        document.getElementById("root")
      );
    },
    {
      leave: (done) => {
        ReactDOM.render(null, document.getElementById("root"));
        done();
      },
    }
  )
  .resolve();
