import { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout.jsx'
import API from '../utils/api.js'

const DashboardPage = () => {
  const [totalEmployees, setTotalEmployees] = useState(0)
  useEffect(() => {
    API.get('/employees').then(({ data }) => setTotalEmployees(data.length)).catch(() => {})
  }, [])

  const stats = [
    { label: 'Total Employees', value: totalEmployees, color: '#1976d2' },
    { label: 'Departments', value: '9', color: '#7c3aed' },
    { label: 'On Leave', value: '—', color: '#f59e0b' },
    { label: 'New This Month', value: '—', color: '#22c55e' },
  ]

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>
      <div className="dashboard-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-card-label">{s.label}</div>
            <div className="stat-card-value" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="table-container" style={{ padding: 32, textAlign: 'center', color: '#6b7280' }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: '#1a1a2e', marginBottom: 8 }}>
          Welcome to RS-TECH Employee Management System
        </p>
        <p style={{ fontSize: 14 }}>
          Navigate to <strong style={{ color: '#1976d2' }}>Employee</strong> to manage your team.
        </p>
      </div>
    </Layout>
  )
}

export default DashboardPage
