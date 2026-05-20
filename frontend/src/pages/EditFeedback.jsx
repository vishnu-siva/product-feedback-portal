import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllFeedbacks, updateFeedback } from '../api/feedbackApi'

export default function EditFeedback() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ userName: '', productName: '', message: '', rating: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllFeedbacks().then((res) => {
      const found = res.data.find((f) => f.id === Number(id))
      if (found) setForm({ userName: found.userName, productName: found.productName, message: found.message, rating: found.rating })
      setLoading(false)
    })
  }, [id])

  function validate() {
    const e = {}
    if (!form.userName.trim()) e.userName = 'User name is required'
    if (!form.productName.trim()) e.productName = 'Product name is required'
    if (!form.message.trim()) e.message = 'Feedback message is required'
    if (!form.rating) e.rating = 'Rating is required'
    else if (form.rating < 1 || form.rating > 5) e.rating = 'Rating must be between 1 and 5'
    return e
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const validation = validate()
    if (Object.keys(validation).length > 0) { setErrors(validation); return }
    try {
      setSubmitting(true)
      await updateFeedback(id, { ...form, rating: Number(form.rating) })
      navigate('/')
    } catch (err) {
      const serverErrors = err.response?.data || {}
      if (typeof serverErrors === 'object') setErrors(serverErrors)
      else alert('Failed to update feedback')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className="loading">Loading...</p>

  return (
    <div className="auth-wrapper">
      <div className="form-card">
        <div className="form-header">
          <button onClick={() => navigate('/')} className="btn-back">← Back</button>
          <h2>Edit Feedback</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Name</label>
            <input name="userName" value={form.userName} onChange={handleChange} />
            {errors.userName && <span className="field-error">{errors.userName}</span>}
          </div>
          <div className="form-group">
            <label>Product Name</label>
            <input name="productName" value={form.productName} onChange={handleChange} />
            {errors.productName && <span className="field-error">{errors.productName}</span>}
          </div>
          <div className="form-group">
            <label>Feedback Message</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={4} />
            {errors.message && <span className="field-error">{errors.message}</span>}
          </div>
          <div className="form-group">
            <label>Rating (1–5)</label>
            <input type="number" name="rating" value={form.rating} onChange={handleChange} min="1" max="5" />
            {errors.rating && <span className="field-error">{errors.rating}</span>}
          </div>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Updating...' : 'Update Feedback'}
          </button>
        </form>
      </div>
    </div>
  )
}
