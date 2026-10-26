import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchEvents = () => apiClient.get('/events');
export const fetchEventById = (id) => apiClient.get(`/events/${id}`);
export const createEvent = (data) => apiClient.post('/events', data);
export const updateEvent = (id, data) => apiClient.put(`/events/${id}`, data);
export const deleteEvent = (id) => apiClient.delete(`/events/${id}`);