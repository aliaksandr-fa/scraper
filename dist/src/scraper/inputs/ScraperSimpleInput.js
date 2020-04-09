"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScraperSimpleInput {
    constructor(currency, date) {
        this.currency = currency;
        this.date = date;
    }
    toJobs() {
        return [{
                currency: this.currency,
                date: this.date
            }];
    }
    isValid() {
        return true;
    }
}
exports.default = ScraperSimpleInput;
//# sourceMappingURL=ScraperSimpleInput.js.map