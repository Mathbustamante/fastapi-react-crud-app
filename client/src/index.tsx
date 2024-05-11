import React from "react"
import ReactDOM from "react-dom/client"
import { Toaster } from "sonner"
import App from "./App"
import "./index.css"
import { UsersProvider } from "./providers/UsersProvider"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <UsersProvider>
      <App />
    </UsersProvider>
    <Toaster richColors />
  </React.StrictMode>
)
