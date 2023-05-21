const { Pengumuman } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
    try {
        const pengumumans = await Pengumuman.findAll();
        res.status(200).json({
            status: 'success',
            data: pengumumans
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}