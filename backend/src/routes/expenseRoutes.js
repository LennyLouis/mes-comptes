const express = require('express');
const mongoose = require('mongoose');
const { expenseSchema } = require('../models/expenseModel');

const router = express.Router();


const Expense = mongoose.model('Expense', expenseSchema);

// GET all expenses
router.get('/', async (req, res, next) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        next(err);
    }
}); 

// GET a specific expense by ID
router.get('/:id', async (req, res, next) => {
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).send('Expense not found');
        res.json(expense);
    } catch (err) {
        next(err);
    }
});

// POST a new expense
router.post('/', async (req, res, next) => {
    try {
        const newExpense = new Expense(req.body);
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        next(err);
    }
});

// PUT (update) an expense by ID
router.put('/:id', async (req, res, next) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedExpense) return res.status(404).send('Expense not found');
        res.json(updatedExpense);
    } catch (err) {
        next(err);
    }
});

// DELETE an expense by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (!deletedExpense) return res.status(404).send('Expense not found');
        res.json({ message: 'Expense deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;