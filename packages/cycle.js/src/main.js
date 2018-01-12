import { makeDOMDriver } from '@cycle/dom'
import { makeHashHistoryDriver } from '@cycle/history'
import { run } from '@cycle/run'
import { routerify } from 'cyclic-router'
import switchPath from 'switch-path'
import { Home } from './app/Home/Home'
import { About } from './app/About/About'
import { Login } from './app/Login/Login'
import xs from 'xstream'


function main(source) {
  const match$ = source.router.define({
    '/': Home,
    '/login': Login,
    '/other': About
  })
  
  const page$ = match$.map(({path, value}) => {
    return value(Object.assign({}, source, {
      router: source.router.path(path)
    }))
  })
  
  return {
    DOM: page$.map((c) => c.DOM),
    router: page$.map((c) => c.router || xs.empty()).flatten()
  }
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  history: makeHashHistoryDriver(),
}


run(routerify(main, switchPath), drivers)
