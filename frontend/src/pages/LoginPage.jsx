import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HARDCODED_EMAIL = 'admin@test.com'
const HARDCODED_PASSWORD = '1234'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      localStorage.setItem('auth', 'true')
      navigate('/')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Feedback Portal</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@test.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
              required
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p className="hint">Use: admin@test.com / 1234</p>
      </div>
    </div>
  )
}
