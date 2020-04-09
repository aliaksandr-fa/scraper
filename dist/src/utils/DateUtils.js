"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DateUtils {
    // @ todo: handle templates
    static format(date, template) {
        let day = (date.getDate()).toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
}
exports.default = DateUtils;
//# sourceMappingURL=DateUtils.js.map