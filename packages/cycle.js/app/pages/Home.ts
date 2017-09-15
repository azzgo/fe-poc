import { Sources } from '@cycle/run';
import xs from 'xstream';
import { h1 } from '@cycle/dom';

export function HomePage(sources: Sources) {
  return {
    DOM: xs.of('').mapTo(h1('HOME'))
  }
}
