import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import API from '../utils/api.js'

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login'
      const payload = isRegister
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password }
      const { data } = await API.post(endpoint, payload)
      login(data)
      navigate('/employee')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">RS-TECH</div>
        <div className="login-subtitle">
          {isRegister ? 'Create your account' : 'Employee Management System'}
        </div>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <label className="login-label">Full Name</label>
              <input className="login-input" type="text" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} required />
            </>
          )}
          <label className="login-label">Email</label>
          <input className="login-input" type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
          <label className="login-label">Password</label>
          <input className="login-input" type="password" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} required />
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? <span className="spinner" /> : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>
        <div className="login-register-link">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <span onClick={() => { setIsRegister(!isRegister); setError('') }}>
            {isRegister ? 'Login' : 'Register'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
