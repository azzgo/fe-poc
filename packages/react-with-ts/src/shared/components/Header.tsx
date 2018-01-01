import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

interface IProps {
}

interface IState {
}

export class Header extends PureComponent<IProps, IState> {
  render() {
    return (
      <header id="header">
				<div className="inner">
					<a href="index.html" className="logo"><strong>Projection</strong> by TEMPLATED</a>
					<nav id="nav">
						<Link to="/">Home</Link>
						<Link to="/generic">Generic</Link>
						<Link to="/elements">Elements</Link>
					</nav>
					<a href="#navPanel" className="navPanelToggle"><span className="fa fa-bars"></span></a>
				</div>
			</header>
    )
  }
}
