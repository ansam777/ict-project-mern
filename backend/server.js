import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDatabase from './config/db.js';
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
connectDatabase();

// API Endpoints
app.use('/api/v1/events', eventRoutes);

// Health Check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'active', message: 'Event Portal API active.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Server] Server running on http://localhost:${PORT}`);
});