import express from 'express';
import Savings from '../models/Savings.js';

const router = express.Router();

// PUT route to add or update a savings entry
router.put('/', async (req, res) => {
  const { investments, userId } = req.body;

  try {
    let savingsEntry = await Savings.findOne({ user: userId });

    if (savingsEntry) {
      for (const [category, newInvestment] of Object.entries(investments)) {
        savingsEntry.investments[category] = newInvestment;
      }
      savingsEntry = await savingsEntry.save();
    } else {
      savingsEntry = new Savings({
        investments,
        user: userId,
      });
      savingsEntry = await savingsEntry.save();
    }

    res.status(200).json(savingsEntry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// GET route to fetch all savings entries for a specific user
router.get('/', async (req, res) => {
  const userId = req.query.userId;

  try {
    const savingsEntries = await Savings.findOne({ user: userId });
    res.status(200).json(savingsEntries);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE route to delete a specific investment
router.delete('/:userId/:category', async (req, res) => {
  const { userId, category } = req.params;

  try {
    let savingsEntry = await Savings.findOne({ user: userId });

    if (savingsEntry) {
      await Savings.updateOne({ user: userId }, { $unset: { [`investments.${category}`]: 1 } });
      res.status(200).json({ message: `Investment category ${category} deleted successfully.` });
    } else {
      res.status(404).send('Savings entry not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;
