"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rate {
    constructor(uuid, currency, currencyTo, sale, purchase, bank, date) {
        this.uuid = uuid;
        this.currency = currency;
        this.currencyTo = currencyTo;
        this.sale = sale;
        this.purchase = purchase;
        this.bank = bank;
        this.date = date || new Date();
    }
    getUuid() {
        return this.uuid;
    }
    getCurrency() {
        return this.currency;
    }
    getCurrencyTo() {
        return this.currencyTo;
    }
    getSale() {
        return this.sale;
    }
    getPurchase() {
        return this.purchase;
    }
    getBank() {
        return this.bank;
    }
    getDate() {
        return this.date;
    }
}
exports.default = Rate;
//# sourceMappingURL=Rate.js.map