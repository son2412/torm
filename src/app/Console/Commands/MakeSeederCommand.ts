import { Command } from './Command';
import * as fse from 'fs-extra';
import moment from 'moment';
import * as path from 'path';

export default class MakeSeederCommand extends Command {
  signature() {
    return 'make:seeder <seeder>';
  }

  description() {
    return 'Test command';
  }

  options() {
    return [];
  }

  async handle(seeder) {
    const file = path.resolve(__dirname, '../../../seeder', `${moment().format('YYYYMMDD_HHmmss')}_${seeder}.js`);

    const content = `'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
    let items = [];

    return queryInterface.bulkInsert('table_name', items.map(item => Object.assign(item, {created_at: new Date(), updated_at: new Date()})));
    },

    down: (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('table_name', null, {});
    }
};`;
    fse.outputFileSync(file, content);
    console.log(`${file} is created`);
    process.exit();
  }
}
