import './styles/libs/select2.css'
import './styles/reset.css'
import './styles/home.less'
import pathToRegex from 'path-to-regexp'

if (location.pathname.match(pathToRegex('/'))) {
  import('./controllers/home')
}

console.log('i am here')
