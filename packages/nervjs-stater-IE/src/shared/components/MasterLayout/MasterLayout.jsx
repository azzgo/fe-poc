import React from 'react'
import { AppBar } from 'src/shared/components/AppBar/AppBar'


export class MasterLayout extends React.PureComponent {
  render () {
    const { match } = this.props
    return (
      <div>
        <AppBar />
      </div>
    )
  }
}
