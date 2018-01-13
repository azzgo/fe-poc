import xs from 'xstream'
import { html } from 'snabbdom-jsx'
import { AppBar } from '../../shared/components/AppBar/AppBar'

function view() {
  return xs.of(
    <div>
      <AppBar />
      Home
    </div>
  )
}

export function Home() {
  const vdom$ = view()

  return {
    DOM: vdom$,
  }
}