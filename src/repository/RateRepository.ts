import {Database} from "sqlite3";
import Rate from '../models/Rate';
import Currency from "../models/Currency";
import Bank from "../models/Bank";

class RateRepository {

    protected db: Database;

    public constructor(db: Database) {
        this.db = db;
    }

    public hasRate(bank: Bank, currency: Currency, currencyTo: Currency, date: Date): Promise<boolean> {

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
            })
        });
    }

    public save(rate: Rate): Promise<any> {
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

export default RateRepository;