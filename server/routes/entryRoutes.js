const express = require('express');
const entryController = require('../controllers/entryController');

const router = express.Router();

router.get('/summary', entryController.summary.bind(entryController));
router.get('/', entryController.list.bind(entryController));
router.post('/', entryController.create.bind(entryController));

module.exports = router;
