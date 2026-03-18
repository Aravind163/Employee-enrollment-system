import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="page-content">{children}</div>
      </div>
    </div>
  )
}

export default Layout
