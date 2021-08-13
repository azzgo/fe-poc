import React, { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import { counter } from "./store";
import {observer} from "mobx-react";

const App = (props) => {
  const [activeTab, setActiveTab] = useState("Home");
  
  return (
    <>
      <nav>
        <ul>
          <li>
            <a onClick={() => setActiveTab("Home")}>Home</a>
          </li>
          <li>
            <a onClick={() => setActiveTab("About")}>About</a>
          </li>
        </ul>
      </nav>
      <p>{counter.triggerWay}</p>
      <section>
        {activeTab === "Home" && <Home />}
        {activeTab === "About" && <About />}
      </section>
    </>
  );
};

export default observer(App);
