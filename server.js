const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const dataBase = require('./DataBase/MongoDatabase.js');
const cors = require('cors');
// Middleware
app.use(express.json());
app.use(cors());
//Task 1
const CoinsSave = require('./Helper/cronJob');
CoinsSave();
const CoinsRoutes = require('./Apis/Routes/Coins.routes');
//Task 2 & 3
app.use('/api/v1/', CoinsRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('Server is Running');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});