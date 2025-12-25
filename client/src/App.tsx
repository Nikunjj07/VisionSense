import { createBrowserRouter, RouterProvider } from "react-router-dom"
import DashboardLayout from "./layouts/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import Classes from "./pages/Classes"
import StudentRecords from "./pages/StudentRecords"
import LiveCam from "./pages/LiveCam"

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "classes",
        element: <Classes />,
      },
      {
        path: "records",
        element: <StudentRecords />,
      },
      {
        path: "live",
        element: <LiveCam />,
      },
    ],
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
