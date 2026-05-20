import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
})

export const getAllFeedbacks = (search = '') =>
  api.get(`/feedbacks${search ? `?search=${search}` : ''}`)

export const createFeedback = (data) => api.post('/feedbacks', data)

export const updateFeedback = (id, data) => api.put(`/feedbacks/${id}`, data)

export const deleteFeedback = (id) => api.delete(`/feedbacks/${id}`)
