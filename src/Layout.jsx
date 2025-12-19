import { Link, Outlet } from 'react-router-dom'
import './Layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="nav-title">🎨 Three.js Demo</h1>
          <div className="nav-links">
            <Link to="/app" className="nav-link">
              📱 App
            </Link>
            <Link to="/car3d" className="nav-link">
              🚗 3D Car
            </Link>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
