const cron = require('node-cron');
const axios = require('axios');
// require('dotenv').config();
// const Coins = require('../Models/Coins.model');
const { ValidCoins } = require('../Apis/Utils/ConstantsValidators');
const Coins = require('../Apis/Models/Coins.model');

const fetchCryptoData = async () => {
    console.log(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ValidCoins.join(',')}`);
    try {
        const options = {
            method: 'GET',
            url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ValidCoins.join(',')}`,
            headers: {accept: 'application/json', 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY},
        };
        
        const response = await axios.request(options);
        const data = response.data;

        const coins = data.map((coin) => {
            return {
                type: coin.id,
                price: coin.current_price,
                marketCap: coin.market_cap,
                "24hChange": coin.price_change_percentage_24h,
            };
        });
        console.log(coins);

        await Coins.insertMany(coins);
        console.log('Data fetched and saved successfully');
    } catch (error) {
        console.log(error.message);
    }
};

const CoinsSave = () => {
    // Schedule the cron job to run every minute at 30 seconds
    cron.schedule('0 */2 * * *', fetchCryptoData); // The correct cron expression for 30 seconds
    console.log('Cron Job Scheduled');
};

module.exports = CoinsSave;
