const mongoose=require('mongoose');
const dbConnection = process.env.DB_CONNECTION || '';

mongoose.connect(dbConnection)
.then(() => {
    console.log('Successfully connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});