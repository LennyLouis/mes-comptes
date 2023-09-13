const mongoose = require('mongoose');
const Category = require('./categoryModel');

const expenseSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    date: Date,
    paidBy: String,
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]
});

module.exports = mongoose.model('Expense', expenseSchema);
