const { Pengumuman } = require('../../../models');

module.exports = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = 5;
        const offset = (page - 1) * limit;

        const { count, rows: pengumumans } = await Pengumuman.findAndCountAll({
            limit,
            offset,
        });

        res.status(200).json({
            status: 'success',
            data: pengumumans,
            total: count,
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}