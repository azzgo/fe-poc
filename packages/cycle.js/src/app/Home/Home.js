import { h1 } from '@cycle/dom'
import classNames from 'classnames'
import xs from 'xstream'


function view() {
  return xs.of(h1({ props: {className: classNames('home', 'ass')}}, 'Home'))
}

export function Home() {
  const vdom$ = view()

  return {
    DOM: vdom$,
  }
}