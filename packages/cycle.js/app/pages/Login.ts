import { button, div, DOMSource, h1, hr, input, label } from '@cycle/dom';
import { source } from '@cycle/dom/lib/es6';
import { Sources } from '@cycle/run';
import xs from 'xstream';

export function LoginPage(sources: Sources) {
  const username$ = ((sources.DOM) as DOMSource)
    .select('.username').elements();
  const password$ = ((sources.DOM) as DOMSource)
    .select('.password').elements();
  const loginPageDom$ = xs.of(
      div([
        div([
          label('Username: '),
          input('.username', {attrs: {type: 'text'}}),
        ]),
        div([
          label('Password: '),
          input('.password', {attrs: {type: 'text'}}),
        ]),
        button('.login-btn', 'Login'),
      ]),
    );

  const loginAction$ = xs.combine(
    username$, password$, ((sources.DOM) as DOMSource).select('.login-btn').events('click'))
    .map(([username, password, click]) => {
      if (username[0].value === 'admin' && password[0].value === 'admin') {
        return '/';
      }
      return xs.never();
    });

  return {
    DOM: loginPageDom$,
    router: loginAction$,
  };
}
