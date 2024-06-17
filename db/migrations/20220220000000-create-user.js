'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes: DT } = Sequelize;
    await queryInterface.createTable('users', {
      createdAt: {
        type: DT.DATE,
        field: 'created_at',
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: DT.DATE,
        field: 'updated_at',
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      deletedAt: {
        type: DT.DATE,
        field: 'deleted_at',
        allowNull: true,
      },
      id: {
        type: DT.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DT.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DT.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DT.STRING,
        allowNull: false,
      },
      name: {
        type: DT.STRING,
        allowNull: false,
      },
      sexType: {
        type: DT.ENUM('Unknown', 'Male', 'Female'),
        field: 'sex_type',
        defaultValue: 'Unknown',
      },
      birthdate: {
        type: DT.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  },
};
