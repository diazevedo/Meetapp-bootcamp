module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('meetups', ['country'], {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('meetups', ['country'], {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
