'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = '$2a$08$KHJeGvYdcD0iCv4bkyLDh.lWrMZ1/ol3AXE9TAJUAq8OWiilR84cW';
    let items = [
      {
        first_name: 'super',
        last_name: 'admin',
        email: 'admin@gmail.com',
        phone: '0379170680',
        password: password,
        birth: '5-2-1996',
        gender: 1,
        status: 1
      }
    ];

    return queryInterface.bulkInsert(
      'users',
      items.map(item => Object.assign(item, { created_at: new Date(), updated_at: new Date() }))
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
