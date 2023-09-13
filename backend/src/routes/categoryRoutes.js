const express = require('express');
const mongoose = require('mongoose');
const Category = require('../models/categoryModel');

const router = express.Router();

// GET all categories
router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        next(err);
    }
});

// GET a specific category by ID
router.get('/:id', async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).send('Category not found');
        res.json(category);
    } catch (err) {
        next(err);
    }
});

// POST a new category
router.post('/', async (req, res, next) => {
    try {
        const newCategory = new Category(req.body);
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (err) {
        next(err);
    }
});

// PUT (update) a category by ID
router.put('/:id', async (req, res, next) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) return res.status(404).send('Category not found');
        res.json(updatedCategory);
    } catch (err) {
        next(err);
    }
});

// DELETE a category by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).send('Category not found');
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;