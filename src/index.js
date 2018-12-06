import "./app/styles/index.scss"

import React from "react"
import ReactDOM from "react-dom"
import App from './App.js'
import { Provider } from 'mobx-react'
import stores from './app/stores/index'
import { ThemeProvider } from 'styled-components'
import mainTheme from './app/styles/theme/mainTheme'

ReactDOM.render(
  <ThemeProvider theme={mainTheme}>
    <Provider {...stores}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
)