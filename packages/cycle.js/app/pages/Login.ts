import { button, div, DOMSource, h1, hr, input } from '@cycle/dom';
import { source } from '@cycle/dom/lib/es6';
import { Sources } from '@cycle/run';
import xs from 'xstream';

export function LoginPage(sources: Sources) {
  const username$ = ((sources.DOM) as DOMSource)
    .select('.username').events('input').map((e) => (e.target as HTMLInputElement).value).startWith('');
  const password$ = ((sources.DOM) as DOMSource)
    .select('.password').events('input').map((e) => (e.target as HTMLInputElement).value).startWith('');
  const loginPageDom$ = xs.combine(username$, password$)
    .map(() => {
      return div([
        input('.username', {attrs: {type: 'text'}}),
        input('.password', {attrs: {type: 'text'}}),
        button('.login-btn', 'clickme'),
      ]);
    });

  const loginAction$ = ((sources.DOM) as DOMSource).select('.login-btn').events('click')
    .compose(() => {
      return xs.combine(username$, password$);
    })
    .map(([username, password]) => {
      console.log(username, password);
      return '';
    });

  return {
    DOM: loginPageDom$,
    router: xs.merge(loginAction$.mapTo('/')),
  };
}
