const { Batch } = require('../../../models');
module.exports = async (req, res) => {
    const { id } = req.params
    try {
        const batch = await Batch.findByPk(id);
        if (!batch) {
            return res.status(404).json({
                status: 'error',
                message: 'Batch not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: batch
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}