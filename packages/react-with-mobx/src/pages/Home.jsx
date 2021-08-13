import {observer} from 'mobx-react';
import React from 'react';
import {counter, IncreaseCount} from '../store';

const Home = (props) => {
  return <>
    <h4>Home</h4>
    <p>counter: {counter.count}</p>
    <button onClick={() => IncreaseCount()}>+</button>
  </>;
};

export default observer(Home);
