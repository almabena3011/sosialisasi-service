const { Batch, UserBatch } = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();
const { getDosenByAuthId, getUserIdsByAuthProdi } = require('../userService');


const schema = {
    userId: { type: "number", integer: true, empty: false },
    nama_program: { type: "string", empty: false },
    tahun_ajaran: { type: "string", empty: false },
    semester: { type: "enum", values: ['ganjil', 'genap'], empty: true },
    ipk_minimum: { empty: false, type: "number", positive: true, min: 0, max: 4.00, fixed: 2 }
};

const validate = new Validator().compile(schema);

module.exports = async (req, res) => {
    req.body.ipk_minimum = parseFloat(req.body.ipk_minimum);

    const validationResult = validate(req.body);

    if (Array.isArray(validationResult)) {
        return res.status(400).json({ errors: validationResult });
    }


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
                message: 'Batch sudah dibuat sebelumnya'
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
        return res.status(201).json({
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