module.exports = {
  up: queryInterface => {
    return queryInterface.renameColumn('meetups', 'creator_id', 'user_id');
  },

  down: queryInterface => {
    return queryInterface.renameColumn('meetups', 'user_id', 'creator_id');
  },
};
