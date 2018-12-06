import "./app/styles/index.scss"

import React from "react"
import ReactDOM from "react-dom"
import App from './App.js'
import { Provider } from 'mobx-react'
import stores from './app/stores/index'
ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
)



// import React from "react"
// import ReactDOM from "react-dom"
// import { Provider } from "mobx-react"
// import stores from "app/stores"
// import App from "app"
//
// ReactDOM.render(
//   <Provider {...stores}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// )
