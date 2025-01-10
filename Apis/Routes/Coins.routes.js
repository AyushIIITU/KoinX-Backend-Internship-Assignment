const {Router}=require('express');
const CoinsController = require('../Controllers/Coins.controller');
const router=Router();
router.get('/status',CoinsController.statusView);
router.get('/deviation',CoinsController.calDeviation);
module.exports=router;