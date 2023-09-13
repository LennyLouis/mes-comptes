const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    date: Date,
    paidBy: String,
    category: String,
});