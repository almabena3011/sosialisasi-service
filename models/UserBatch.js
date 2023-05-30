const { DataTypes, Model } = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
    class UserBatch extends Model {
        static associate(models) {

        }
    }
    UserBatch.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            batchId: {
                type: DataTypes.INTEGER,
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
            modelName: 'UserBatch',
            tableName: 'user_bacth',
            timestamps: true,
        }
    );

    return UserBatch;
};




