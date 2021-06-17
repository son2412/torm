'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let items = [
      {
        creator_id: 2
      }
    ];

    return queryInterface.bulkInsert(
      'groups',
      items.map((item) => Object.assign(item, { created_at: new Date(), updated_at: new Date() }))
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('groups', null, {});
  }
};
