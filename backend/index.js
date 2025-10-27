require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const ProductRouter = require('./routes/ProductRouter');
const connectDB = require('./config/db');

const app = express();

// Built-in body parser (no separate body-parser dependency needed)
app.use(express.json());
app.use(cors());

connectDB();

app.get('/health', (req, res) => {
  res.send('Server is running...');
});

app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

