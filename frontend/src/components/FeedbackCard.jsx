export default function FeedbackCard({ feedback, onDelete, onEdit }) {
  const { id, userName, productName, message, rating, createdAt } = feedback

  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  })

  return (
    <div className="feedback-card">
      <div className="card-header">
        <span className="card-name">{userName}</span>
        <span className="card-product">{productName}</span>
      </div>
      <p className="card-message">{message}</p>
      <div className="card-footer">
        <span className="card-stars">{stars}</span>
        <span className="card-date">{date}</span>
      </div>
      <div className="card-actions">
        <button onClick={() => onEdit(id)} className="btn-secondary">Edit</button>
        <button onClick={() => onDelete(id)} className="btn-danger">Delete</button>
      </div>
    </div>
  )
}
