// import xs from 'xstream'
import { div, form, h3, input, button } from '@cycle/dom'
import classNames from 'classnames'

import styles from './Login.less'

function intent(source) {
  return source.DOM.select('button').events('click').map((event) => {
    event.stopPropagation()
    return '/'
  })
}

function view() {
  return div(
    {
      props: {
        className: classNames(styles.auth, 'row center-xs middle-xs')
      },
    },
    [
      form(
        '.col-xs-6.shadow-2',
        [
          div(
            {
              props: {
                className: classNames(styles.inputs, 'row center-xs middle-xs')
              },
            },
            [
              h3({props: {
                className: classNames(styles.title, 'col-xs-8')
              }}, 'Sign In'),
              input('.col-xs-8', {
                type: 'email',
                name: 'email',
                placeholder: 'email',
                required: true,
              }),
              input('.col-xs-8', {
                type: 'password',
                name: 'password',
                placeholder: 'email',
                required: true,
              }),
              div('.col-xs-12', [
                div('.row.center-xs', [
                  button('.btn-light', {
                    type: 'submit',
                  }, 'Login')
                ])
              ])
            ]
          )
        ]
      )
    ]
  )
}

export function Login(source) {
  const router$ = intent(source)
  const vdom$ = view()

  return {
    DOM: vdom$,
    router: router$,
  }
}