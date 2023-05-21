const { Pengumuman } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const { getUserById } = require('../userService');

module.exports = async (req, res) => {

    const { id } = req.params
    const { userId } = req.query
    try {
        const pengumuman = await Pengumuman.findByPk(id);
        if (!pengumuman) {
            return res.status(404).json({
                status: 'error',
                message: 'Pengumuman not found'
            });
        }

        const user = await getUserById(userId);
        // Check if the announcement was created by the same user
        if (user.user.id !== pengumuman.userId) {
            return res.status(403).json({
                status: 'error',
                message: 'You are not allowed to update this announcement'
            });
        }

        await pengumuman.destroy();
        res.json({
            status: "success",
            message: "pengumuman deleted successfully"
        })

    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({ error: 'User not found' });
        } else if (error.message === 'User service is not available') {
            res.status(500).json({ error: 'User service is not available' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}