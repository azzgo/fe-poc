import { h1, makeDOMDriver } from '@cycle/dom'
import { makeHashHistoryDriver } from '@cycle/history'
import { run } from '@cycle/run'
import xs from 'xstream'

function main(_: any) {
  return {
    DOM: xs.of(h1('1 seconds elapsed')),
  }
}

run(main, {
  DOM: makeDOMDriver('#app'),
  history: makeHashHistoryDriver(),
})
