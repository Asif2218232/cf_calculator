import React from 'react'
import { 
  createBrowserRouter, 
  RouterProvider, 
} 
from 'react-router-dom'
import Add from './pages/Add'

// root routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Add />,
  }
])

export default function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}