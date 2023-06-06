const { Batch, UserBatch } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const { getDosenByAuthId, getUserIdsByAuthProdi } = require('../userService');


const schema = {
    userId: { type: "number", integer: true, empty: false },
    nama_program: { type: "string", empty: false },
    tahun_ajaran: { type: "number", empty: false },
    semester: { type: "enum", values: ['ganjil', 'genap'], empty: true },
    ipk_minimum: {
        type: "custom",
        empty: false,
        check: value => {
            if (typeof value !== 'string' || isNaN(Number(value))) {
                return ["ipk_minimum harus berupa angka dalam format string"];
            }

            const valueParts = value.split('.');

            // Menyertakan skala 1 sebelum koma dan 1 atau 2 di belakang koma
            if (valueParts[0].length > 1 || (valueParts[1] && valueParts[1].length > 2)) {
                return ["ipk_minimum harus memiliki skala 1 sebelum koma dan 1 atau 2 di belakang koma"];
            }

            return true;
        }
    }
};



module.exports = async (req, res) => {
    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }
    req.body.ipk_minimum = parseFloat(req.body.ipk_minimum);
    const { userId, nama_program, tahun_ajaran, semester, ipk_minimum } = req.body
    try {
        let batch;
        const dosen = await getDosenByAuthId(userId);
        batch = await Batch.findOne({
            where: {
                prodiId: dosen.prodiId,
                tahun_ajaran: tahun_ajaran,
                semester: semester
            }
        })
        console.log(batch);
        if (batch) {
            return res.status(409).json({
                status: 'error',
                message: 'batch sudah dibuat sebelumnya'
            })
        }
        batch = await Batch.create({
            userId: userId,
            dosenId: dosen.id,
            prodiId: dosen.prodiId,
            nama_program: nama_program,
            tahun_ajaran: tahun_ajaran,
            semester: semester,
            ipk_minimum: ipk_minimum
        });

        const userIds = await getUserIdsByAuthProdi(dosen.prodiId)
        console.log(userIds);
        for (let id of userIds) {
            await UserBatch.create({ batchId: batch.id, userId: id });
        }
        res.status(201).json({
            status: 'success',
            data: batch
        });

    } catch (error) {
        if (error.message === 'Dosen not found') {
            res.status(404).json({
                error: 'Dosen not found'
            });
        } else if (error.message === 'User service is not available') {
            res.status(500).json({ error: 'User service is not available' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}