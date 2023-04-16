import React from "react"
import ROUTES from "./routes"

const Routers = [
  {
    path: ROUTES.HOME,
    component: React.lazy(() => import("../view/Layouts")),
  }
]

export default Routers