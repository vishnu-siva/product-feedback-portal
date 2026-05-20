import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import AddFeedback from './pages/AddFeedback'
import EditFeedback from './pages/EditFeedback'

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('auth') === 'true'
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><AddFeedback /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditFeedback /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
