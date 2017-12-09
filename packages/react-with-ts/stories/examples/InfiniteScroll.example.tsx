import React, { PureComponent } from 'react'
import { InfiniteScroll } from '../../src/shared/components/InfiniteScroll'

interface IProps {
}

interface IState {
}

export class InfiniteScrollExample extends PureComponent<IProps, IState> {
  state = {
    list: [
      
    ]
  }

  render() {
    return (
      <InfiniteScroll>
        <span>Hello</span>
      </InfiniteScroll>
    )
  }
}
