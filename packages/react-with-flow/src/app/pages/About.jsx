import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export class About extends PureComponent {
  render() {
    return (
      <div>
      About
        <Link to="/">Go to About</Link>
      </div>
    )
  }
}