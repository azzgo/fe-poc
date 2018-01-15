import xs from 'xstream'
import { html } from 'snabbdom-jsx'
import { AppBar } from '../../shared/components/AppBar/AppBar'


function view() {
  const appBar = AppBar()
  return appBar.DOM.map((appBarDOM) => (
    <div>
      {appBarDOM}
      <h1>About</h1>
    </div>
  ))
}

export function About() {
  const vdom$ = view()

  return {
    DOM: vdom$,
  }
}