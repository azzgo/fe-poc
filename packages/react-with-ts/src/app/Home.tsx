import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { returntypeof } from 'react-redux-typescript'

import { demoAction } from 'src/actions/demoAction'

interface IOwnProps {
}

interface IState {
}

const mapStateToProps = (state: IStoreState) => ({
  demoCount: state.demo,
})

const mapStateToPropsType = returntypeof(mapStateToProps)

type IStateToPropsType = typeof mapStateToPropsType

const mapDispatchToProps = {
  demoAction,
}

type IDispatchToPropsType = typeof mapDispatchToProps

@(connect(mapStateToProps, mapDispatchToProps) as InferableConnectType<IStateToPropsType, IDispatchToPropsType, IOwnProps>)
export class HomePage extends PureComponent<IOwnProps & IStateToPropsType & IDispatchToPropsType, IState> {
  private bindReference = (element: HTMLElement) => {
    console.log('bindReference', element)
  }

  render() {
    const { demoCount, demoAction } = this.props

    return (
      <div className="home">
        <p ref={(element) => console.log('arrow function', element) }>Count: {demoCount}</p>
        <button ref={this.bindReference}><Link to="about">about page</Link></button>
        <button onClick={() => demoAction()}>add count</button>
      </div>
    )
  }
}
