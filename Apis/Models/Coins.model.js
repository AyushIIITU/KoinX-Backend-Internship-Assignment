const mongoose = require("mongoose");
const { ValidCoins } = require("../Utils/ConstantsValidators");

const coinsSchema = new mongoose.Schema(
  {
    type:{
        type: String,
        required: true,
        enum:ValidCoins
    },
    price:{
        type: Number,
        required: true
    },
    marketCap:{
        type: Number,
        required: true
    },
    "24hChange":{
        type: Number,
        required: true
    },
  },
  {
    timestamps: true,
  }
);
const Coins = new mongoose.model("Coins", coinsSchema);

module.exports = Coins;
