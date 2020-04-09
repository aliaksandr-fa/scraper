"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Currency_1 = require("../models/Currency");
class CurrencyRepository {
    constructor(db) {
        this.db = db;
    }
    hasCurrency(code) {
        return new Promise((resolve, reject) => {
            this.db.get(`select count(*) as currenciesFound from currencies where code = ?`, [code], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row.currenciesFound > 0);
            });
        });
    }
    getByCode(code) {
        return new Promise((resolve, reject) => {
            this.db.get(`select * from currencies where code = ?`, [code], (err, row) => {
                if (err) {
                    reject(err);
                }
                if (row) {
                    resolve(new Currency_1.default(row.code, row.name, row.symbol));
                }
                resolve(null);
            });
        });
    }
}
exports.default = CurrencyRepository;
//# sourceMappingURL=CurrencyRepository.js.map