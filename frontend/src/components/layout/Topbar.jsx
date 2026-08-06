import { MdSettings, MdNotifications } from 'react-icons/md'
import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

const Topbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    if (window.confirm('Logout from RS-TECH EMS?')) {
      logout()
      navigate('/login')
    }
  }

  return (
    <header className="topbar">
      <div className="topbar-icon" title="Settings">
        <MdSettings />
      </div>
      <div className="topbar-icon" title="Notifications">
        <MdNotifications />
      </div>
      <div className="topbar-avatar" title={`${user?.name} — Click to logout`} onClick={handleLogout}>
        {user?.avatar ? (
          <img src={user.avatar} alt="avatar" />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: '#1976d2',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 15
          }}>
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
        )}
      </div>
    </header>
  )
}

export default Topbar
