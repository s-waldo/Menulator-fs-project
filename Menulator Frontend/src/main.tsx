import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import "./styles.css"
import { BrowserRouter } from "react-router-dom"

const container = document.getElementById("root")
if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
}
