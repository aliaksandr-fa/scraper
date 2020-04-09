import Bank from './../models/Bank';
import {Database} from 'sqlite3';

class BankRepository {

    protected db: Database;

    public constructor(db: Database) {
        this.db = db;
    }

    public hasBank(name: string): Promise<boolean> {

        return new Promise((resolve, reject) => {
            this.db.get(`select count(*) as banksFound from banks where name = ?`, [name], (err, row) => {
                if (err) {
                    reject(err);
                }

                resolve(row.banksFound > 0);
            })
        });
    }

    public getByName(name: string): Promise<Bank | null> {

        return new Promise((resolve, reject) => {
            this.db.get(`select * from banks where name = ?`, [name], (err, row) => {
                if (err) {
                    reject(err);
                }

                if (row) {
                    resolve(new Bank(row.id, row.name));
                }

                resolve(null);
            })
        });
    }

    public save(bank: Bank): Promise<any> {

        return new Promise((resolve, reject) => {
            this.db.run(`insert into banks (id, name) values (?, ?)`, [bank.getId(), bank.getName()], function (err, row) {
                if (err) {
                    reject(err);
                }

                resolve(new Bank(this.lastID, bank.getName()));
            });
        });

    }
}

export default BankRepository;