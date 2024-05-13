import express from 'express';
import Expense from '../models/Expense.js';

const router = express.Router();

// POST route to add a new expense
router.post('/', async (req, res) => {
  const { amount, description, category, userId, shareCount } = req.body;
  const expense = new Expense({
    amount,
    description,
    category,
    user: userId,
    shareCount,
  });

  try {
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// GET route to fetch expenses filtered by user ID
router.get('/', async (req, res) => {
  const userId = req.query.userId;

  try {
    const expenses = await Expense.find({ user: userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE route to remove an expense by ID
router.delete('/:id', async (req, res) => {
  const userId = req.body.userId;
  const expenseId = req.params.id;

  try {
    const deletedExpense = await Expense.findOneAndDelete({ _id: expenseId, user: userId });
    if (!deletedExpense) {
      return res.status(404).send('Expense not found');
    }
    res.status(200).json(deletedExpense);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT route to update an expense by ID
router.put('/:id', async (req, res) => {
  const userId = req.body.userId;
  const expenseId = req.params.id;
  const { amount, description, hidden, category, shareCount } = req.body;

  try {
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: expenseId, user: userId },
      { amount, description, hidden, category, shareCount },
      { new: true },
    );
    if (!updatedExpense) {
      return res.status(404).send('Expense not found');
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
