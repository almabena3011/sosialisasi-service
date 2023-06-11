const { Batch } = require('../../../models');
const { getAllDosenByProdiBatchId } = require('../userService');

module.exports = async (req, res) => {
    try {
        const batchId = req.params.batchId;
        const batch = await Batch.findByPk(batchId);
        if (!batch) {
            return res.status(404).json({
                status: 'error',
                message: "Batch Not Found"
            })
        }
        console.log(batchId);
        console.log(batch);

        const alldosen = await getAllDosenByProdiBatchId(batch.prodiId);
        return res.status(200).json({
            status: 'success',
            data: alldosen,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
