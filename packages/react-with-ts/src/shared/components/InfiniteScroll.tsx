import React, { PureComponent } from 'react'

interface IProps {
  children?: JSX.Element[] | JSX.Element,
  onRefresh?: () => void,
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
