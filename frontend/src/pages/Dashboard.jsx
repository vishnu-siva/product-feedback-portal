import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllFeedbacks, deleteFeedback } from '../api/feedbackApi'
import FeedbackCard from '../components/FeedbackCard'

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  async function fetchFeedbacks(query = '') {
    try {
      setLoading(true)
      setError('')
      const res = await getAllFeedbacks(query)
      setFeedbacks(res.data)
    } catch {
      setError('Failed to load feedbacks. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e) {
    const val = e.target.value
    setSearch(val)
    fetchFeedbacks(val)
  }

  async function handleDelete(id) {
    try {
      await deleteFeedback(id)
      setFeedbacks((prev) => prev.filter((f) => f.id !== id))
    } catch {
      alert('Failed to delete feedback')
    }
  }

  function handleLogout() {
    localStorage.removeItem('auth')
    navigate('/login')
  }

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <nav className="navbar">
        <h1>Feedback Portal</h1>
        <div className="nav-actions">
          <button onClick={() => setDarkMode(!darkMode)} className="btn-secondary">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={() => navigate('/add')} className="btn-primary">
            + Add Feedback
          </button>
          <button onClick={handleLogout} className="btn-danger">
            Logout
          </button>
        </div>
      </nav>

      <div className="container">
        <div className="dashboard-header">
          <div className="stats-card">
            <span className="stats-number">{feedbacks.length}</span>
            <span className="stats-label">Total Feedbacks</span>
          </div>
          <input
            className="search-input"
            type="text"
            placeholder="Search by name or product..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        {loading && <p className="loading">Loading feedbacks...</p>}
        {error && <p className="error-msg">{error}</p>}

        {!loading && !error && feedbacks.length === 0 && (
          <p className="empty">No feedbacks found. Add one!</p>
        )}

        <div className="feedback-grid">
          {feedbacks.map((fb) => (
            <FeedbackCard
              key={fb.id}
              feedback={fb}
              onDelete={handleDelete}
              onEdit={(id) => navigate(`/edit/${id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
