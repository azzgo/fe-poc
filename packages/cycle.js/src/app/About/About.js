import xs from 'xstream'
import { html } from 'snabbdom-jsx'
import { AppBar } from '../../shared/components/AppBar/AppBar'


function view() {
  return xs.of(
    <div>
      <AppBar />
      <h1>About</h1>
    </div>
  )
}

export function About() {
  const vdom$ = view()

  return {
    DOM: vdom$,
  }
}