module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('meetups', ['image_id'], {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('meetups', ['image_id'], {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
