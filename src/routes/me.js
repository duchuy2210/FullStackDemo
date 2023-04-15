
const express = require('express');
const router = express.Router();
const meController = require('../app/controllers/MeController');

router.get('/stored/games',meController.stored);
router.get('/trash/games',meController.trash);

module.exports = router;