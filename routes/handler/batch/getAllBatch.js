const { Batch } = require('../../../models');
module.exports = async (req, res) => {
    try {
        const batches = await Batch.findAll()
        return res.json({
            status: 'success',
            data: batches,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
