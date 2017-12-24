import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

interface IOwnProps {
}

interface IState {
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

@connect(mapStateToProps, mapDispatchToProps)
export class HomePage extends PureComponent<IOwnProps, IState> {
  render() {
    return (
      <div className="home">
        <button><Link to="about">about page</Link></button>
        
      </div>
    )
  }
}
