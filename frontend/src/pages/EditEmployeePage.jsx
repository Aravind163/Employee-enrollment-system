import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MdArrowBack, MdPerson, MdEdit, MdKeyboardArrowDown, MdCameraAlt } from 'react-icons/md'
import Layout from '../components/layout/Layout.jsx'
import API from '../utils/api.js'
import toast from 'react-hot-toast'

const DESIGNATIONS = [
  'Design Lead','Senior Designer','UI Designer','UX Designer',
  'Frontend Developer','Backend Developer','Full Stack Developer',
  'Project Manager','Product Manager','Team Lead',
  'Software Engineer','Senior Engineer','DevOps Engineer',
  'QA Engineer','Business Analyst','HR Manager','Accountant',
]
const DEPARTMENTS = ['Design','Engineering','Product','Marketing','Sales','HR','Finance','Operations','Support']
const TYPES = ['Office','Remote','Hybrid']
const STATUSES = ['Permanent','Contract','Intern','Part-time']

const EditEmployeePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const fileRef = useRef()
  const [form, setForm] = useState({ name:'', employeeId:'', department:'', designation:'', project:'', type:'', status:'' })
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    API.get(`/employees/${id}`)
      .then(({ data }) => {
        setForm({ name:data.name||'', employeeId:data.employeeId||'', department:data.department||'', designation:data.designation||'', project:data.project||'', type:data.type||'', status:data.status||'' })
        if (data.avatar) setAvatarPreview(data.avatar)
      })
      .catch(() => { toast.error('Failed to load employee'); navigate('/employee') })
      .finally(() => setFetching(false))
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.employeeId.trim()) errs.employeeId = 'Required'
    if (!form.department) errs.department = 'Required'
    if (!form.designation) errs.designation = 'Required'
    if (!form.type) errs.type = 'Required'
    if (!form.status) errs.status = 'Required'
    return errs
  }

  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([k, v]) => formData.append(k, v))
      if (avatarFile) formData.append('avatar', avatarFile)
      await API.put(`/employees/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Employee updated successfully!')
      navigate('/employee')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update employee')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return (
    <Layout>
      <div style={{ padding: 60, textAlign: 'center', color: '#6b7280' }}>Loading...</div>
    </Layout>
  )

  return (
    <Layout>
      <div className="form-page">
        <div className="form-page-header" onClick={() => navigate('/employee')}>
          <MdArrowBack /><span>Edit Employee Details</span>
        </div>
        <div className="form-tab"><MdPerson />Personal Information</div>

        <div className="avatar-upload-wrapper">
          <div className="avatar-preview">
            {avatarPreview ? <img src={avatarPreview} alt="preview" /> : <MdCameraAlt className="avatar-placeholder-icon" />}
          </div>
          <div className="avatar-edit-btn" onClick={() => fileRef.current.click()}>
            <MdEdit size={11} />
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleAvatarChange} />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Name<span>*</span></label>
            <input className="form-input" name="name" placeholder="Enter name" value={form.name} onChange={handleChange} style={errors.name?{borderColor:'#ef4444'}:{}} />
            {errors.name && <span style={{color:'#ef4444',fontSize:12}}>{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Employee ID<span>*</span></label>
            <input className="form-input" name="employeeId" placeholder="Enter employee ID" value={form.employeeId} onChange={handleChange} style={errors.employeeId?{borderColor:'#ef4444'}:{}} />
            {errors.employeeId && <span style={{color:'#ef4444',fontSize:12}}>{errors.employeeId}</span>}
          </div>
          <div className="form-group">
            <label>Department<span>*</span></label>
            <div className="form-select-wrapper">
              <select className="form-select" name="department" value={form.department} onChange={handleChange}>
                <option value="">Select Department</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <MdKeyboardArrowDown className="select-arrow" />
            </div>
            {errors.department && <span style={{color:'#ef4444',fontSize:12}}>{errors.department}</span>}
          </div>
          <div className="form-group">
            <label>Designation<span>*</span></label>
            <div className="form-select-wrapper">
              <select className="form-select" name="designation" value={form.designation} onChange={handleChange}>
                <option value="">Select designation</option>
                {DESIGNATIONS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <MdKeyboardArrowDown className="select-arrow" />
            </div>
            {errors.designation && <span style={{color:'#ef4444',fontSize:12}}>{errors.designation}</span>}
          </div>
          <div className="form-group">
            <label>Project</label>
            <input className="form-input" name="project" placeholder="Enter Project" value={form.project} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Type<span>*</span></label>
            <div className="form-select-wrapper">
              <select className="form-select" name="type" value={form.type} onChange={handleChange}>
                <option value="">Select Type</option>
                {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <MdKeyboardArrowDown className="select-arrow" />
            </div>
            {errors.type && <span style={{color:'#ef4444',fontSize:12}}>{errors.type}</span>}
          </div>
          <div className="form-group">
            <label>Status<span>*</span></label>
            <div className="form-select-wrapper">
              <select className="form-select" name="status" value={form.status} onChange={handleChange}>
                <option value="">Select Status</option>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <MdKeyboardArrowDown className="select-arrow" />
            </div>
            {errors.status && <span style={{color:'#ef4444',fontSize:12}}>{errors.status}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-secondary" onClick={() => navigate('/employee')}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? <span className="spinner" /> : 'Update'}
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default EditEmployeePage
