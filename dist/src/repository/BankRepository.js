"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bank_1 = require("./../models/Bank");
class BankRepository {
    constructor(db) {
        this.db = db;
    }
    hasBank(name) {
        return new Promise((resolve, reject) => {
            this.db.get(`select count(*) as banksFound from banks where name = ?`, [name], (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row.banksFound > 0);
            });
        });
    }
    getByName(name) {
        return new Promise((resolve, reject) => {
            this.db.get(`select * from banks where name = ?`, [name], (err, row) => {
                if (err) {
                    reject(err);
                }
                if (row) {
                    resolve(new Bank_1.default(row.id, row.name));
                }
                resolve(null);
            });
        });
    }
    save(bank) {
        return new Promise((resolve, reject) => {
            this.db.run(`insert into banks (id, name) values (?, ?)`, [bank.getId(), bank.getName()], function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(new Bank_1.default(this.lastID, bank.getName()));
            });
        });
    }
}
exports.default = BankRepository;
//# sourceMappingURL=BankRepository.js.map