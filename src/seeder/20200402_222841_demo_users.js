'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const password = '$2a$08$KHJeGvYdcD0iCv4bkyLDh.lWrMZ1/ol3AXE9TAJUAq8OWiilR84cW';
    const items = [
      {
        first_name: 'super',
        last_name: 'admin',
        email: 'admin@gmail.com',
        phone: '0379170680',
        password: password,
        birthday: '05-02-1996',
        gender: 1,
        status: 1
      },
      {
        first_name: 'Ngo',
        last_name: 'Son',
        email: 'ngovanson196v@gmail.com',
        phone: '0379170680',
        password: password,
        birthday: '05-02-1996',
        avatar:
          'https://scr.vn/wp-content/uploads/2020/08/%E1%BA%A2nh-g%C3%A1i-d%E1%BB%85-th%C6%B0%C6%A1ng-l%C3%A0m-h%C3%ACnh-%C4%91%E1%BA%A1i-di%E1%BB%87n-xinh-x%E1%BA%AFn.jpg',
        gender: 1,
        status: 1
      },
      {
        first_name: 'Huong',
        last_name: 'Nguyen',
        email: 'shiranheika@gmail.com',
        phone: '0332641010',
        password: password,
        birthday: '17-11-1998',
        avatar:
          'https://chiase24.com/wp-content/uploads/2019/07/T%E1%BB%95ng-h%E1%BB%A3p-h%C3%ACnh-%E1%BA%A3nh-g%C3%A1i-xinh-d%E1%BB%85-th%C6%B0%C6%A1ng-cute-nh%E1%BA%A5t-6.jpg',
        gender: 1,
        status: 1
      }
    ];

    return queryInterface.bulkInsert(
      'users',
      items.map((item) => Object.assign(item, { created_at: new Date(), updated_at: new Date() }))
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
