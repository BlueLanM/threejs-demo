import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import App from './App'
import Car3D from './Car3D'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'app',
        element: <App />
      },
      {
        path: 'car3d',
        element: <Car3D />
      }
    ]
  }
], {
  basename: '/threejs-demo/'
})

export default function Router() {
  return <RouterProvider router={router} />
}
