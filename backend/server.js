const express = require('express');
const mongoose = require('mongoose');
const expenseRoutes = require('./src/routes/expenseRoutes');

const { MONGODB_URI, PORT } = require('./src/config/env');

const app = express();

connectMongooseDb(mongoose);
app.use('/expenses', expenseRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});