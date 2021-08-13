import {observer} from "mobx-react";
import React from "react";
import {counter, DecreaseCount} from "../store";

const About = (props) => {
  return (
    <>
      <h4>About</h4>
      <p>counter: {counter.count}</p>
      <button onClick={() => DecreaseCount()}>-</button>
    </>
  );
};

export default observer(About);
