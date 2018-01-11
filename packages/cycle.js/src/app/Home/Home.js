import { h1 } from '@cycle/dom'
import classNames from 'classnames'


function view() {
  return h1({ props: {className: classNames('home', 'ass')}}, 'Home')
}

export function Home() {
  const vdom$ = view()

  return {
    DOM: vdom$,
  }
}