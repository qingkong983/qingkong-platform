import ReactDOM from 'react-dom'
import './assets/css/index.css'
import { HashRouter } from 'react-router-dom'
import App from './App'
// import 'antd/dist/antd.min.css'

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
)
