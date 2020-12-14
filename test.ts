const GoogleSpreadSheet = require('google-spreadsheet');
const { promisify } = require('util');
const moment = require('moment');
const credentials = require('./client_secret.json');

async function acccessSpearSheet() {
  const doc = new GoogleSpreadSheet('16neLnP6-rEnYeOMkLNm-gWAZtNIxu6Y-21dESI2UXjM');
  await promisify(doc.useServiceAccountAuth)(credentials);
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];
  // save row
  // const row = {
  //   name: 'Huong',
  //   email: 'shiranheika@gmail.com',
  //   message: 'test1',
  //   date: moment().format('YYYY-MM-DD HH:mm')
  // };
  // await promisify(sheet.addRow)(row);
  // get row
  // const rows = await promisify(sheet.getRows)({});
  // rows.map((row) => print(row));
  // create sheet
  const newSheet = await promisify(doc.addWorksheet).call(doc, { title: moment().format('YYYY-MM-DD') });
  newSheet.setHeaderRow(['Name', 'Email', 'Message', 'Date']);
}

function print(item) {
  console.log(item.name + ' | ' + item.email + ' | ' + item.message);
}

acccessSpearSheet();
