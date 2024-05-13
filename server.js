import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import expenseRoutes from './app/routes/expenseRoutes.js';
import authRoutes from './app/routes/authRoutes.js';

const app = express();

// Setup CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200,
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

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the Budget Tracker API!');
});

// Use authentication and expense routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
