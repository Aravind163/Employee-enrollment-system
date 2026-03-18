import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import EmployeePage from './pages/EmployeePage.jsx'
import AddEmployeePage from './pages/AddEmployeePage.jsx'
import EditEmployeePage from './pages/EditEmployeePage.jsx'
import CalendarPage from './pages/CalendarPage.jsx'
import MessagesPage from './pages/MessagesPage.jsx'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', color: '#6b7280', fontSize: 15
      }}>
        Loading...
      </div>
    )
  }
  return user ? children : <Navigate to="/login" replace />
}

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<Navigate to="/employee" replace />} />
    <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
    <Route path="/employee" element={<PrivateRoute><EmployeePage /></PrivateRoute>} />
    <Route path="/employee/add" element={<PrivateRoute><AddEmployeePage /></PrivateRoute>} />
    <Route path="/employee/edit/:id" element={<PrivateRoute><EditEmployeePage /></PrivateRoute>} />
    <Route path="/calendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
    <Route path="/messages" element={<PrivateRoute><MessagesPage /></PrivateRoute>} />
    <Route path="*" element={<Navigate to="/employee" replace />} />
  </Routes>
)

const App = () => (
  <AuthProvider>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: { fontSize: 14, borderRadius: 8 }
      }}
    />
    <AppRoutes />
  </AuthProvider>
)

export default App
