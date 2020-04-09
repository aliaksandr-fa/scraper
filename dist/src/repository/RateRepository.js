"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RateRepository {
    constructor(db) {
        this.db = db;
    }
    hasRate(bank, currency, currencyTo, date) {
        return new Promise((resolve, reject) => {
            const sql = `select count(*) as ratesFound 
                         from rates 
                         where 
                            bank = ? and
                            currency = ? and 
                            currency_to = ? and 
                            date = ?`;
            this.db.get(sql, [bank.getId(), currency.getCode(), currencyTo.getCode(), date], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row.ratesFound > 0);
            });
        });
    }
    save(rate) {
        return new Promise((resolve, reject) => {
            const sql = `insert into rates (uuid, currency, currency_to, sale, purchase, date, bank) 
                         values (?, ?, ?, ?, ?, ?, ?)`;
            const params = [
                rate.getUuid(),
                rate.getCurrency().getCode(),
                rate.getCurrencyTo().getCode(),
                rate.getSale(),
                rate.getPurchase(),
                rate.getDate(),
                rate.getBank().getId()
            ];
            this.db.run(sql, params, (err) => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
}
exports.default = RateRepository;
//# sourceMappingURL=RateRepository.js.map