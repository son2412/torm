'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(function handleTransaction(t) {
      return Promise.all([
        queryInterface.bulkInsert('roles', [
          {
            name: 'Admin',
            slug: 'admin',
            created_at: new Date(),
            updated_at: new Date()
          },
          {
            name: 'User',
            slug: 'user',
            created_at: new Date(),
            updated_at: new Date()
          }
        ])
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
