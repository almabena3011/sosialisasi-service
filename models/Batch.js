const { DataTypes, Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    class Batch extends Model {
        static associate(models) {

        }
    }
    Batch.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            dosenId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            prodiId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            nama_program: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tahun_ajaran: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            semester: {
                type: DataTypes.ENUM,
                values: ['genap', 'ganjil'],
                allowNull: true,
            },
            ipk_minimum: {
                type: DataTypes.DECIMAL(3, 2),
                allowNull: false
            },
            isFinished: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            startDate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(),
                get() {
                    return moment(this.getDataValue('startDate')).format('YY-MM-DD');
                }
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: true
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                get() {
                    return moment(this.getDataValue('createdAt')).format('YY-MM-DD');
                }
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                get() {
                    return moment(this.getDataValue('updatedAt')).format('YY-MM-DD');
                }
            },
        },
        {
            sequelize,
            modelName: 'Batch',
            tableName: 'batch_mbkm',
            timestamps: true,
        }
    );

    return Batch;
};




