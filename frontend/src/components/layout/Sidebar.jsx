import { useNavigate, useLocation } from 'react-router-dom'
import { MdDashboard, MdPeople, MdCalendarToday, MdMessage } from 'react-icons/md'

const navItems = [
  { label: 'Dashboard', icon: <MdDashboard />, path: '/dashboard' },
  { label: 'Employee',  icon: <MdPeople />,    path: '/employee' },
  { label: 'Calendar',  icon: <MdCalendarToday />, path: '/calendar' },
  { label: 'Messages',  icon: <MdMessage />,   path: '/messages' },
]

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">RS-TECH</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.path}
            className={`nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
