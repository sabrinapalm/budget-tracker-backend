import mongoose from 'mongoose';

const categoryEnum = [
  'savings',
  'private',
  'shared',
  'mortgage',
  'other',
  'food',
  'transport',
  'clothing',
  'loan',
  'streaming',
  'pets',
];

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
    enum: categoryEnum,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  hidden: {
    type: Boolean,
    required: false,
  },

  shareCount: {
    type: Number,
    required: false,
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
