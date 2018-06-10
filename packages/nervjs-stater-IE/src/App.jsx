
import React from 'react'
import ReactDOM from 'react-dom'

import { MasterLayout } from 'src/shared/components/MasterLayout/MasterLayout'

import 'src/shared/styles/flexboxgrid.min.css'
import 'src/shared/styles/global.css'
import 'src/shared/styles/icons.css'

class App extends React.Component {

  render () {
    return <div>hello</div>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
)
