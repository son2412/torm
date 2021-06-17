'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let items = [
      {
        user_id: 2,
        group_id: 1
      },
      {
        user_id: 3,
        group_id: 1
      }
    ];

    return queryInterface.bulkInsert(
      'user_group',
      items.map((item) => Object.assign(item, { created_at: new Date(), updated_at: new Date() }))
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_group', null, {});
  }
};
