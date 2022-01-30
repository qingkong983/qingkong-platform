import ReactDOM from 'react-dom'
import './assets/css/index.css'
import { HashRouter } from 'react-router-dom'
import App from './App'

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
)
