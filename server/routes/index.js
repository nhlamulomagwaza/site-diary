const express = require('express');
const entryRoutes = require('./entryRoutes');

const router = express.Router();

router.use('/entries', entryRoutes);

module.exports = router;
