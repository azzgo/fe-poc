import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export class Home extends PureComponent {
  render() {
    return (
      <div>
        Home
        <Link to="/about">Go to About</Link>
      </div>
    )
  }
}