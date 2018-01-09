import { h1, makeDOMDriver } from '@cycle/dom'
import { makeHashHistoryDriver } from '@cycle/history'
import { run } from '@cycle/run'

const drivers = {
  DOM: makeDOMDriver('#app'),
  history: makeHashHistoryDriver(),
}

function view(history$) {
  return history$.map((location) => {
    return h1(location.pathname)
  })
}

function main(source) {

  const vdom$ = view(source.history)
  
  return {
    DOM: vdom$,
  }
}

run(main, drivers)
