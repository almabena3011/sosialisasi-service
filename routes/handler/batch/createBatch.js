const { Batch } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const { getUserById } = require('../userService');


const schema = {
    userId: { type: "number", integer: true, empty: false },
    judul: { type: "string", empty: false },
    deskripsi: { type: "string", empty: false },
    kategori: { type: "enum", values: ['S1 Informatika', 'S1 Sistem Informasi', 'S1 Teknik Elektro', 'BAAK'], empty: true }
};

module.exports = async (req, res) => {
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const { userId, judul, deskripsi, kategori } = req.body
    try {
        const user = await getUserById(userId);
        const pengumuman = await Pengumuman.create({
            userId: userId,
            judul: judul,
            deskripsi: deskripsi,
            kategori: kategori,
            createdBy: `${user.user.fullname}`
        });
        res.json(pengumuman);
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({
                error: 'User not found'
            });
        } else if (error.message === 'User service is not available') {
            res.status(500).json({ error: 'User service is not available' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}