'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const items = [
      {
        user_id: 1,
        role_id: 1
      },
      {
        user_id: 2,
        role_id: 2
      },
      {
        user_id: 3,
        role_id: 2
      }
    ];

    return queryInterface.bulkInsert(
      'user_role',
      items.map((item) => Object.assign(item, { created_at: new Date(), updated_at: new Date() }))
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_role', null, {});
  }
};
