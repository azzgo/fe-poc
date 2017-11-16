import React, { PureComponent } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import { Home } from './pages/Home'
import { About } from './pages/About'

export class AppRouters extends PureComponent {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    )
  }
}