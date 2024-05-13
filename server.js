import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import expenseRoutes from './app/routes/expenseRoutes.js';
import authRoutes from './app/routes/authRoutes.js';

const app = express();

// Setup CORS
app.use(
  cors({
    origin: process.env.PRODUCTION_URL || 'http://localhost:3000',
  }),
);

// Connect to MongoDB Atlas cluster
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch((err) => {
    console.error('Connection error:', err);
    process.exit(1);
  });

app.use(express.json());

// Use authentication and expense routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
