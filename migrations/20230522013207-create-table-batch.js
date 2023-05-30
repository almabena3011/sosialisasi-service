'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('batch_mbkm', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      dosenId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      prodiId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nama_program: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gelombang: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tahun_ajaran: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      semester: {
        type: Sequelize.ENUM,
        values: ['genap', 'ganjil'],
        allowNull: true,
      },
      ipk_minimum: {
        type: Sequelize.DECIMAL(3, 2),
        allowNull: false,
      },
      isFinished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date()
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      proposal_path: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('batch_mbkm');
  }
};
