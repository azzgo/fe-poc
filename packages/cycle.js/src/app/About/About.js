import xs from 'xstream'


function view() {
  return xs.of('about')
}

export function About() {
  const vdom$ = view()

  return {
    DOM: vdom$,
  }
}