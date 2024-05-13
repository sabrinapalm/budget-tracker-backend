import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  income: { type: Number, required: false },
  salaryDay: { type: Number, required: false },
  categoryOrder: { type: [String], required: false },
});

const User = mongoose.model('User', userSchema);

export default User;
