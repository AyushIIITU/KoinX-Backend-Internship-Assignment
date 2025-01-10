// const Coins = require("../Models/Coins.model");
const axios = require("axios");
const { ValidCoins } = require("../Utils/ConstantsValidators");
const Coin = require("../Models/Coins.model");
const CoinsController = {
  statusView: async (req, res) => {
    try {
      const { coin } = req.query;
      console.log(coin);
      if (!coin) {
        return res.status(400).json({ message: "Coin is required" });
      }
      if (!ValidCoins.includes(coin)) {
        return res.status(400).json({ message: "Invalid Coin" });
      }
      const CoinStatus = await Coin.findOne({ type: coin })
        .sort({ createdAt: -1 })
        .select("-_id -__v -createdAt -updatedAt");
      if (!CoinStatus) {
        return res.status(404).json({ message: "Coin not found" });
      }
      res.status(200).json(CoinStatus);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  calDeviation: async (req, res) => {
    try {
      const { coin } = req.query;

      // Validate the coin parameter
      if (!coin) {
        return res.status(400).json({ message: "Coin is required" });
      }
      if (!ValidCoins.includes(coin)) {
        return res.status(400).json({ message: "Invalid Coin" });
      }

      // Fetch the last 100 records for the given coin
      const CoinData = await Coin.find({ type: coin })
        .sort({ createdAt: -1 }) // Sort by most recent
        .limit(100); // Limit to 100 records
      // Check if data exists
      if (!CoinData || CoinData.length === 0) {
        return res
          .status(404)
          .json({ message: "Coin not found or no data available" });
      }

      // Calculate the average and deviation
      const prices = CoinData.map((coin) => coin.price); // Extract prices
      const total = prices.reduce((sum, price) => sum + price, 0);
      const avg = total / prices.length; // Calculate average
      // Calculate standard deviation
      const deviation = Math.sqrt(
        prices.reduce((sum, price) => sum + Math.pow(price - avg, 2), 0) /
          prices.length
      );

      // Send the response
      res.status(200).json({ deviation });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = CoinsController;
