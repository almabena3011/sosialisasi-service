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
      koordinatorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nama_program: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      program_studi: {
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
