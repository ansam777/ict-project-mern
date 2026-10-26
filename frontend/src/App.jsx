import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EventForm from './pages/EventForm.jsx';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen flex flex-col bg-[#050508] text-slate-100 font-sans overflow-x-hidden selection:bg-white selection:text-black">
        
        {/* Glowing Background Mesh (Creates the actual Glass distortion effect) */}
        <div className="fixed top-[-100px] left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-slate-200/20 via-slate-400/10 to-transparent rounded-full blur-[140px] pointer-events-none"></div>
        <div className="fixed bottom-[-100px] right-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-white/10 via-slate-500/10 to-transparent rounded-full blur-[160px] pointer-events-none"></div>
        <div className="fixed top-1/2 left-[-150px] w-[500px] h-[500px] bg-white/5 rounded-full blur-[130px] pointer-events-none"></div>

        {/* Ambient Grid lines */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-[0.03]" 
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        ></div>

        <Navbar />
        
        <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-event" element={<EventForm />} />
            <Route path="/edit-event/:id" element={<EventForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;