const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const { logoutController, getTrendingStartup } = require('../controller/supporterController');
const router = express.Router();

router.get('/trending',authMiddleware,getTrendingStartup)
router.post('/logout', logoutController);

module.exports = router;