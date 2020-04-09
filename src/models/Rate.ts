import Currency from "./Currency";
import Bank from "./Bank";

class Rate {

    protected uuid: string;
    protected currency: Currency;
    protected currencyTo: Currency;
    protected sale: number;
    protected purchase: number;
    protected bank: Bank;
    protected date?: Date;


    public constructor(uuid: string,
                       currency: Currency,
                       currencyTo: Currency,
                       sale: number,
                       purchase: number,
                       bank: Bank,
                       date?: Date
    ) {
        this.uuid = uuid;
        this.currency = currency;
        this.currencyTo = currencyTo;
        this.sale = sale;
        this.purchase = purchase;
        this.bank = bank;
        this.date = date || new Date();
    }

    public getUuid() {
        return this.uuid;
    }

    public getCurrency(): Currency {
        return this.currency;
    }

    public getCurrencyTo(): Currency {
        return this.currencyTo;
    }

    public getSale(): number {
        return this.sale
    }

    public getPurchase(): number {
        return this.purchase;
    }

    public getBank(): Bank {
        return this.bank;
    }

    public getDate(): Date {
        return this.date;
    }
}

export default Rate;