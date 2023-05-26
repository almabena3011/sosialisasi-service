const { DataTypes, Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    class Pengumuman extends Model {
        static associate(models) {

        }
    }
    Pengumuman.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
            },
            judul: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deskripsi: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            kategori: {
                type: DataTypes.ENUM('S1 Informatika', 'S1 Sistem Informasi', 'S1 Teknik Elektro', 'BAAK'),
                allowNull: true,
            },
            createdBy: {
                type: DataTypes.STRING,
                allowNull: false,
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
            modelName: 'Pengumuman',
            tableName: 'pengumumans',
            timestamps: true,
        }
    );

    return Pengumuman;
};




