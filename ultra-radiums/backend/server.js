import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { requestLogger } from './middleware/logMiddleware.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import postRoutes from './routes/postRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup - Support local development and staging environments
app.use(cors({
  origin: '*', // For demo compatibility. Restrict to frontend origin in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(requestLogger);

// REST API Endpoints
app.use('/api/posts', postRoutes);
app.use('/api/orders', orderRoutes);

// Base health route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Ultra Radiums Backend API is operational.'
  });
});

// Centralized error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[SERVER RUNNING] Express backend running on http://localhost:${PORT}`);
});
