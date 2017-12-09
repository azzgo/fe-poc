import React, { PureComponent } from 'react'

interface IProps {
  children: JSX.Element,
  OnRefresh?: () => void,
  loader?: JSX.Element, 
}

interface IState {
}

export class InfiniteScroll extends PureComponent<IProps, IState> {
  render() {
    const { children } = this.props
    return (
      <div>
        {children}
      </div>
    )
  }
}
