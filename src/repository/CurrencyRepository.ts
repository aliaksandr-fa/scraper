import Currency from "../models/Currency";
import {Database} from "sqlite3";

class CurrencyRepository {

    protected db: Database;

    public constructor(db: Database) {
        this.db = db;
    }

    public hasCurrency(code: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.db.get(`select count(*) as currenciesFound from currencies where code = ?`, [code], (err, row) => {
                if (err) {
                    reject(err);
                }

                resolve(row.currenciesFound > 0);
            })
        });
    }

    public getByCode(code: string): Promise<Currency|null> {
        return new Promise((resolve, reject) => {
            this.db.get(`select * from currencies where code = ?`, [code], (err, row) => {
                if (err) {
                    reject(err);
                }

                if (row) {
                    resolve(new Currency(row.code, row.name, row.symbol));
                }

                resolve(null);
            })
        });
    }
}

export default CurrencyRepository;