module.exports = {
  up: queryInterface => {
    return queryInterface.renameColumn('meetups', 'decription', 'description');
  },

  down: queryInterface => {
    return queryInterface.renameColumn('meetups', 'description', 'decription');
  },
};
