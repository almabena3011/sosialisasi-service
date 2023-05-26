var express = require('express');
var router = express.Router();

const pengumumanHandler = require('./handler/pengumuman');

router.post('/', pengumumanHandler.createPengumuman);
router.get('/', pengumumanHandler.getAllPengumuman);
router.get('/byAuthProdi', pengumumanHandler.getPengumumansByAuthProdi);
router.get('/:id', pengumumanHandler.getPengumuman);
router.put('/:id', pengumumanHandler.updatePengumuman);
router.delete('/:id', pengumumanHandler.removePengumuman);

module.exports = router;
