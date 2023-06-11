var express = require('express');
var router = express.Router();

const batchHandler = require('./handler/batch');

router.get('/:batchId/alldosen', batchHandler.getAllDosenByProdiBatchId);
router.get('/:userId/userbatch', batchHandler.getBatchesByAuthId);
router.post('/', batchHandler.createBatch);
router.get('/', batchHandler.getAllBatch);
router.get('/:id/detail', batchHandler.getBatch);



module.exports = router;
