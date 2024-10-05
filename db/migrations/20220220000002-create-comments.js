/* eslint-disable no-undef */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes: DT } = Sequelize;
    await queryInterface.createTable('comments', {
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
      postId: {
        type: DT.BIGINT,
        field: 'post_id',
        references: {
          model: 'posts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      commentatorId: {
        type: DT.BIGINT,
        field: 'commentator_id',
        defaultValue: null,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      content: {
        type: DT.TEXT,
        allowNull: false,
      },
      hidden: {
        type: DT.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  },
};
