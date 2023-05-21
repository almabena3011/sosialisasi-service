const { Pengumuman } = require('../../../models');

module.exports = async (req, res) => {
    const { id } = req.params
    try {
        const pengumuman = await Pengumuman.findByPk(id);
        if (!pengumuman) {
            return res.status(404).json({
                status: 'error',
                message: 'Pengumuman not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: pengumuman
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}