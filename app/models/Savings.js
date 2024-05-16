import mongoose from 'mongoose';

const categoryEnum = ['pension', 'funds', 'buffer', 'other'];

const investmentSchema = new mongoose.Schema({
  category: { type: String, enum: categoryEnum, required: false },
  amount: { type: Number, required: false },
});

const savingsSchema = new mongoose.Schema({
  investments: {
    pension: investmentSchema,
    funds: investmentSchema,
    buffer: investmentSchema,
    other: investmentSchema,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Savings = mongoose.model('Savings', savingsSchema);

export default Savings;
