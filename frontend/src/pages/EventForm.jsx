import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEvent, fetchEventById, updateEvent } from '../services/api.js';
import { Calendar, MapPin, FileText, Tag, ArrowLeft, Save, Sparkles } from 'lucide-react';

const EventForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: '',
    venue: '',
    totalRegistrations: 0,
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const getEventDetails = async () => {
        try {
          setLoading(true);
          const response = await fetchEventById(id);
          const data = response.data.data;
          
          // Format ISO date to YYYY-MM-DD for standard HTML input
          const formattedDate = data.eventDate ? new Date(data.eventDate).toISOString().split('T')[0] : '';
          
          setFormData({
            title: data.title || '',
            description: data.description || '',
            eventDate: formattedDate,
            venue: data.venue || '',
            totalRegistrations: data.totalRegistrations || 0,
          });
        } catch (err) {
          setErrorMessage('Could not load existing event data.');
        } finally {
          setLoading(false);
        }
      };
      getEventDetails();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      if (isEditMode) {
        await updateEvent(id, formData);
      } else {
        await createEvent(formData);
      }
      navigate('/');
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Operation failed. Please verify form values.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-panel p-12 rounded-2xl text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-block w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        <p className="text-sm text-slate-400">Loading event specifications...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </button>

        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>{isEditMode ? 'Update Workflow' : 'Creation Workflow'}</span>
        </div>
      </div>

      {/* Main Glass Form */}
      <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {isEditMode ? 'Modify Event Specifications' : 'Register New Event'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Fill in the required information below to persist changes to MongoDB Atlas.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span>Event Name</span>
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Global Tech Summit 2026"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>

          {/* Description Field */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Event Description</span>
            </label>
            <textarea
              name="description"
              required
              rows="3"
              placeholder="Detailed outline of topics, schedules, and targets..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm resize-none"
            ></textarea>
          </div>

          {/* Date & Venue Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Event Date</span>
              </label>
              <input
                type="date"
                name="eventDate"
                required
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl glass-input text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Venue</span>
              </label>
              <input
                type="text"
                name="venue"
                required
                placeholder="e.g. Grand Auditorium, Block A"
                value={formData.venue}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl glass-input text-sm"
              />
            </div>
          </div>

          {/* Optional Initial Registrations Count */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Total Registrations (Initial Seed)
            </label>
            <input
              type="number"
              name="totalRegistrations"
              min="0"
              value={formData.totalRegistrations}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center space-x-2 px-6 py-2.5 bg-white text-black font-semibold rounded-xl text-xs uppercase tracking-wider hover:bg-slate-200 transition shadow-lg shadow-white/10 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? 'Saving...' : isEditMode ? 'Update Event' : 'Save Event'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;