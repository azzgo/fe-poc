import { div, DOMSource, h1, input } from '@cycle/dom';
import { Sources } from '@cycle/run';
import xs from 'xstream';

export function LoginPage(sources: Sources) {
  const username$ = ((sources.DOM) as DOMSource)
    .select('.username').events('input').map(e => (e.target as HTMLInputElement).value).startWith('')
  const password$ = ((sources.DOM) as DOMSource)
    .select('.password').events('input').map(e => (e.target as HTMLInputElement).value).startWith('')
  const loginPageDom$ = xs.merge(username$, password$).map(() => {
    return div([
      input('.username', {attrs: {type: 'text'}}),
      input('.password', {attrs: {type: 'text'}})
    ])
  })
  return {
    DOM: loginPageDom$
  };
}
