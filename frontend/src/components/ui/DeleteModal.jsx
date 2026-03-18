import { MdDeleteOutline } from 'react-icons/md'

const DeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">
          <MdDeleteOutline />
        </div>
        <div className="modal-text">
          Are you sure you want<br />to Delete
        </div>
        <div className="modal-actions">
          <button className="btn-danger" onClick={onCancel}>Cancel</button>
          <button className="btn-primary" onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
