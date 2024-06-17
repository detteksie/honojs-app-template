'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes: DT } = Sequelize;
    await queryInterface.createTable('posts', {
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
      authorId: {
        type: DT.BIGINT,
        field: 'author_id',
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      title: {
        type: DT.STRING,
        allowNull: false,
      },
      content: {
        type: DT.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      isPublished: {
        type: DT.BOOLEAN,
        field: 'is_published',
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  },
};
