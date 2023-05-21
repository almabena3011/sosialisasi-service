const { Pengumuman } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const { getUserById } = require('../userService');

const schema = {
    userId: { type: "number", integer: true },
    judul: { type: "string", optional: true },
    deskripsi: { type: "string", optional: true },
    kategori: { type: "enum", values: ['S1 Informatika', 'S1 Sistem Informasi', 'S1 Teknik Elektro', 'BAAK'], optional: true }
};

module.exports = async (req, res) => {
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const { id } = req.params
    const { userId, judul, deskripsi, kategori } = req.body
    try {
        const pengumuman = await Pengumuman.findByPk(id);
        if (!pengumuman) {
            return res.status(404).json({
                status: 'error',
                message: 'Pengumuman not found'
            });
        }
        const user = userId ? await getUserById(userId) : null;

        // Check if the announcement was created by the same user
        if (pengumuman.userId !== user.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'You are not allowed to update this announcement'
            });
        }

        if (judul) pengumuman.judul = judul;
        if (deskripsi) pengumuman.deskripsi = deskripsi;
        if (kategori) pengumuman.kategori = kategori;
        if (user) {
            pengumuman.createdBy = user.user.fullname;
            pengumuman.userId = userId;
        }
        await pengumuman.save();
        res.json({
            status: "success",
            data: pengumuman,
            message: "pengumuman updated successfully"
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