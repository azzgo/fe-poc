import { div, DOMSource, h1, input, hr } from '@cycle/dom';
import { Sources } from '@cycle/run';
import xs from 'xstream';

export function LoginPage(sources: Sources) {
  const username$ = ((sources.DOM) as DOMSource)
    .select('.username').events('input').map(e => (e.target as HTMLInputElement).value).startWith('')
  const password$ = ((sources.DOM) as DOMSource)
    .select('.password').events('input').map(e => (e.target as HTMLInputElement).value).startWith('')
  const loginPageDom$ = xs.combine(username$, password$)
    .map(() => {
      return div([
        input('.username', {attrs: {type: 'text'}}),
        input('.password', {attrs: {type: 'text'}}),
      ])
    })
  
  const loginAction$ = ((sources.DOM) as DOMSource).select('.login-btn').events('click')

  return {
    DOM: loginPageDom$,
    router: loginAction$.mapTo('/')
  };
}
