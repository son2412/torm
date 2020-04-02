'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let items = [
      {
        user_id: 1,
        role_id: 1
      }
    ];

    return queryInterface.bulkInsert(
      'user_role',
      items.map(item => Object.assign(item, { created_at: new Date(), updated_at: new Date() }))
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_role', null, {});
  }
};
