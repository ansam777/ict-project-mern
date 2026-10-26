import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEvents, deleteEvent } from '../services/api.js';
import { Calendar, MapPin, Users, Edit3, Trash2, Plus, Sparkles, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadEventRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchEvents();
      setEvents(response.data.data || []);
    } catch (err) {
      setError('Failed to retrieve event records. Ensure your backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEventRecords();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      try {
        await deleteEvent(id);
        setEvents(events.filter((item) => item._id !== id));
      } catch (err) {
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Stat Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Realtime Overview</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Event Management Hub</h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-right">
            <span className="block text-xs text-slate-400 uppercase">Total Scheduled</span>
            <span className="text-xl font-bold text-white">{events.length}</span>
          </div>
          <button
            onClick={loadEventRecords}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition"
            title="Refresh List"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Table / Grid Container */}
      {loading ? (
        <div className="glass-panel p-12 rounded-2xl text-center space-y-3">
          <div className="inline-block w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="text-sm text-slate-400">Querying database cluster...</p>
        </div>
      ) : error ? (
        <div className="glass-panel p-8 rounded-2xl border-red-500/30 text-center space-y-4">
          <p className="text-red-400 text-sm">{error}</p>
          <button
            onClick={loadEventRecords}
            className="px-4 py-2 bg-white/10 text-white rounded-xl text-xs font-semibold hover:bg-white/20 transition"
          >
            Retry Connection
          </button>
        </div>
      ) : events.length === 0 ? (
        <div className="glass-panel p-16 rounded-2xl text-center space-y-4">
          <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-semibold text-white">No Events Scheduled</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Your event register is currently empty. Click below to add a new event to the MongoDB database.
          </p>
          <button
            onClick={() => navigate('/add-event')}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white text-black font-semibold rounded-xl text-xs uppercase tracking-wider hover:bg-slate-200 transition shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Event</span>
          </button>
        </div>
      ) : (
        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Event ID</th>
                  <th className="py-4 px-6">Event Details</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Venue</th>
                  <th className="py-4 px-6 text-center">Registrations</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {events.map((evt) => (
                  <tr key={evt._id} className="hover:bg-white/[0.02] transition">
                    {/* Event ID */}
                    <td className="py-4 px-6 font-mono text-xs text-slate-400">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                        {evt.eventId || `EVT-${evt._id.slice(-6).toUpperCase()}`}
                      </span>
                    </td>

                    {/* Name & Description */}
                    <td className="py-4 px-6 max-w-xs">
                      <div className="font-semibold text-white tracking-wide">{evt.title}</div>
                      <div className="text-xs text-slate-400 truncate mt-0.5">{evt.description}</div>
                    </td>

                    {/* Event Date */}
                    <td className="py-4 px-6 text-xs text-slate-300">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{new Date(evt.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </td>

                    {/* Venue */}
                    <td className="py-4 px-6 text-xs text-slate-300">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate max-w-[150px]">{evt.venue}</span>
                      </div>
                    </td>

                    {/* Total Registrations */}
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white">
                        <Users className="w-3 h-3 text-slate-400" />
                        <span>{evt.totalRegistrations || 0}</span>
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => navigate(`/edit-event/${evt._id}`)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/20 text-slate-300 hover:text-white transition border border-white/10"
                        title="Edit Event"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(evt._id, evt.title)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;