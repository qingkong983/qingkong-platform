import React from 'react'
import ReactDOM from 'react-dom'
import './assets/css/index.css'
import App from './App'
// import 'antd/dist/antd.min.css'
import { HashRouter } from "react-router-dom";


ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById('root')
)
