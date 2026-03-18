import { MdClose, MdPerson } from 'react-icons/md'

const ViewModal = ({ employee, onClose }) => {
  if (!employee) return null

  const fields = [
    { label: 'Employee Name', value: employee.name },
    { label: 'Employee ID',   value: employee.employeeId },
    { label: 'Department',    value: employee.department },
    { label: 'Designation',   value: employee.designation },
    { label: 'Project',       value: employee.project || '—' },
    { label: 'Type',          value: employee.type },
    { label: 'Status',        value: employee.status },
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="view-modal-header">
          <span className="view-modal-title">Employee Details</span>
          <button className="view-modal-close" onClick={onClose}><MdClose /></button>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
          {employee.avatar ? (
            <img src={employee.avatar} alt={employee.name} className="view-modal-avatar" />
          ) : (
            <div style={{ width:72, height:72, borderRadius:10, background:'#e3f2fd', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, color:'#1976d2' }}>
              <MdPerson />
            </div>
          )}
          <div>
            <div style={{ fontWeight:700, fontSize:18 }}>{employee.name}</div>
            <div style={{ color:'#6b7280', fontSize:14 }}>{employee.designation}</div>
          </div>
        </div>
        {fields.map((f) => (
          <div className="view-field" key={f.label}>
            <span className="view-field-label">{f.label}</span>
            <span className="view-field-value">{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewModal
