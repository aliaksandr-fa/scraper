'use strict';

const fs = require('fs');

const currencies = JSON.parse(fs.readFileSync(__dirname + '/currencies.json', 'utf-8'));
const availableCurrencies = ["USD", "EUR", "CAD", "GBP", "CHF", "RUB", "PLN", "UAH"];

let dbm;
let type;
let seed;


exports.setup = function (options, seedLink) {
	dbm = options.dbmigrate;
	type = dbm.dataType;
	seed = seedLink;
};

exports.up = function (db) {

	db.createTable('currencies', {
		code: {
			type: 'string',
			length: 3,
			primaryKey: true,
			notNull: true
		},
		name: 'string',
		symbol: {
			type: 'string',
			length: 5
		}
	}, () => seedCurrencies(db));

	db.createTable('banks', {
		id: {
			type: 'int',
			primaryKey: true,
			autoIncrement: true
		},
		name: 'string'
	});

	db.createTable('rates', {
		uuid: {
			type: 'string',
			length: 36
		},
		currency: {
			type: 'string',
			length: 3,
			notNull: true,
			foreignKey: {
				name: 'rate_currency_code_fk',
				table: 'currencies',
				mapping: 'code'
			}
		},
		currency_to: {
			type: 'string',
			length: 3,
			notNull: true,
			foreignKey: {
				name: 'rate_currency_code_fk',
				table: 'currencies',
				mapping: 'code'
			}
		},
		sale: 'decimal',
		purchase: 'decimal',
		date: 'date',
		bank: {
			type: 'int',
			notNull: true,
			foreignKey: {
				name: 'rate_bank_id_fk',
				table: 'banks',
				mapping: 'id'
			}
		}

	});

	return null;
};

exports.down = function (db) {
	db.dropTable('currencies');
	db.dropTable('banks');
	db.dropTable('rates');

	return null;
};

exports._meta = {
	"version": 1
};


function seedCurrencies(db) {

	const insertCurrencySql = `
		insert into currencies (code, name, symbol)
		values (?, ?, ?)
	`;

	availableCurrencies.forEach((currency) => {
		if (currencies[currency]) {
			db.runSql(insertCurrencySql, [
				currencies[currency]['code'],
				currencies[currency]['name'],
				currencies[currency]['symbol_native']
			]);
		}
	});
}