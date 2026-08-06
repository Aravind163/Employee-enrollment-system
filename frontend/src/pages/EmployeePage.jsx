import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdSearch, MdAdd, MdVisibility, MdEdit, MdDelete } from 'react-icons/md'
import Layout from '../components/layout/Layout.jsx'
import DeleteModal from '../components/ui/DeleteModal.jsx'
import ViewModal from '../components/ui/ViewModal.jsx'
import API from '../utils/api.js'
import toast from 'react-hot-toast'

const EmployeePage = () => {
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [viewTarget, setViewTarget] = useState(null)
  const navigate = useNavigate()

  const fetchEmployees = async (q = '') => {
    try {
      const { data } = await API.get(`/employees${q ? `?search=${encodeURIComponent(q)}` : ''}`)
      setEmployees(data)
    } catch {
      toast.error('Failed to load employees')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEmployees() }, [])

  const handleSearch = (e) => {
    const val = e.target.value
    setSearch(val)
    fetchEmployees(val)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      await API.delete(`/employees/${deleteTarget._id}`)
      toast.success('Employee deleted successfully')
      setDeleteTarget(null)
      fetchEmployees(search)
    } catch {
      toast.error('Failed to delete employee')
    }
  }

  const getStatusClass = (status) => {
    const map = {
      Permanent: 'status-permanent',
      Contract: 'status-contract',
      Intern: 'status-intern',
      'Part-time': 'status-part-time',
    }
    return map[status] || ''
  }

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Employee</h1>
        <div className="page-actions">
          <div className="search-box">
            <MdSearch />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <button className="btn-primary" onClick={() => navigate('/employee/add')}>
            <MdAdd />
            Add New Employee
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Project</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8}><div className="empty-state">Loading...</div></td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan={8}><div className="empty-state">No records found</div></td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp._id}>
                  <td>
                    <div className="employee-name-cell">
                      {emp.avatar ? (
                        <img src={emp.avatar} alt={emp.name} className="emp-avatar" />
                      ) : (
                        <div className="emp-avatar-placeholder">
                          {emp.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span>{emp.name}</span>
                    </div>
                  </td>
                  <td>{emp.employeeId}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.project || '—'}</td>
                  <td>{emp.type}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-icons">
                      <button className="action-btn view" title="View" onClick={() => setViewTarget(emp)}>
                        <MdVisibility />
                      </button>
                      <button className="action-btn edit" title="Edit" onClick={() => navigate(`/employee/edit/${emp._id}`)}>
                        <MdEdit />
                      </button>
                      <button className="action-btn delete" title="Delete" onClick={() => setDeleteTarget(emp)}>
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {deleteTarget && (
        <DeleteModal
          onCancel={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
      {viewTarget && (
        <ViewModal employee={viewTarget} onClose={() => setViewTarget(null)} />
      )}
    </Layout>
  )
}

export default EmployeePage
