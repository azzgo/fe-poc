import { div, h1, hr, input, label, makeDOMDriver } from '@cycle/dom';
import { makeHistoryDriver } from '@cycle/history';
import { run } from '@cycle/run';
import { routerify } from 'cyclic-router';
import switchPath from 'switch-path';
import xs from 'xstream';
import { LoginPage } from './pages/Login';
import { HomePage } from './pages/Home';

function main(sources) {
  const match$ = sources.router.define({
    '/': HomePage,
    '/login': LoginPage,
  });

  const page$ = match$.map(({path, value}) => {
    return value(Object.assign({}, sources, {
      router: sources.router.path(path),
    }));
  });

  return {
    DOM: page$.map((c) => c.DOM).flatten(),
    router: page$.map((c) => c.router || xs.empty()).flatten(),
  };
}

run(routerify(main, switchPath), {
  DOM: makeDOMDriver('#app'),
  history: makeHistoryDriver(),
});
