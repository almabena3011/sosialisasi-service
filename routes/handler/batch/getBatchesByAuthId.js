const { Batch, UserBatch } = require('../../../models');
module.exports = async (req, res) => {
    const { userId } = req.params
    try {
        const userbatches = await UserBatch.findAll({
            where: { userId: userId }
        })

        let batches = [];
        for (let userbatch of userbatches) {
            // console.log(userbatch);
            const batch = await Batch.findOne({
                where:
                    { id: userbatch.batchId }
            });
            batches.push(batch);
        }
        return res.json({
            status: 'success',
            data: batches,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
