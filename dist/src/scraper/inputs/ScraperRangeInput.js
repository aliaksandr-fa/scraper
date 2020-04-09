"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScraperRangeInput {
    constructor(currencies, dateFrom, dateTo) {
        this.currencies = currencies;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }
    toJobs() {
        if (this.dateFrom > this.dateTo) {
            return [];
        }
        // not so good idea to mess with clean input, better make a copy of
        // normalized values
        this.dateFrom = this.normalizeDate(this.dateFrom);
        this.dateTo = this.normalizeDate(this.dateTo);
        let jobs = [];
        let dateRange = [];
        let currentDate = this.dateFrom;
        while (currentDate <= this.dateTo) {
            dateRange.push(new Date(currentDate));
            let nextDate = currentDate.getDate() + 1;
            currentDate = new Date(currentDate);
            currentDate.setDate(nextDate);
            this.normalizeDate(currentDate);
        }
        this.currencies.forEach((currency) => {
            dateRange.forEach((date) => {
                jobs.push({
                    currency: currency,
                    date: date
                });
            });
        });
        return jobs;
    }
    normalizeDate(date) {
        date.setHours(23, 59, 59, 59);
        return date;
    }
}
exports.default = ScraperRangeInput;
//# sourceMappingURL=ScraperRangeInput.js.map