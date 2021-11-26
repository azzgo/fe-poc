import React from "react";
import ReactDOM from "react-dom";
import "jsoneditor/dist/jsoneditor.css";
import Navigo from "navigo";
import RenderPage from "./RenderPage";
import EditorPage from "./EditorPage";

const router = new Navigo("/", { hash: true });

router
  .hooks({
    after: ((match) => {
      const navBtns = document.querySelectorAll('body > nav > a')
      for (let btn of navBtns) {
        btn.classList.remove('active');
        if (btn.getAttribute('href').indexOf(match.url) > -1) {
          btn.classList.add('active');
        }
      }
    })
  })
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
