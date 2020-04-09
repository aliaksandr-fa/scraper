"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateType extends Date {
    constructor(date) {
        if (!DateType.DATE_REGEXP.test(date)) {
            throw new Error('Invalid date. Correct format: DD-MM-YYYY');
        }
        let parsedDate = date.match(DateType.DATE_REGEXP);
        super(parseInt(parsedDate[3]), parseInt(parsedDate[2], 10) - 1, parseInt(parsedDate[1]), 23, 59, 59);
    }
}
DateType.DATE_REGEXP = /^(\d{2})-(\d{2})-(\d{4})$/;
exports.default = DateType;
//# sourceMappingURL=DateType.js.map