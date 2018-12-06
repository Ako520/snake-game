import "./app/styles/index.scss"
import React from "react"
import ReactDOM from "react-dom"
import App from './app/index.js'
import { ThemeProvider } from 'styled-components'
import mainTheme from './app/styles/theme/mainTheme'
import control from './app/stores/control'
import ground from './app/stores/ground'

control.ground = ground

ReactDOM.render(
  <ThemeProvider theme={mainTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
)