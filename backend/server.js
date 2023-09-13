const express = require('express');
const mongoose = require('mongoose');
const expenseRoutes = require('./src/routes/expenseRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const connectMongooseDb = require('./src/utils/dbConnection');

const PORT = process.env.PORT || 3000;
const app = express();

try { connectMongooseDb(mongoose) } catch (err) { console.log(err); }

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/expenses', expenseRoutes);
app.use('/categories', categoryRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});