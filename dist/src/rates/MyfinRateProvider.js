"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cheerio = require("cheerio");
const DateUtils_1 = require("../utils/DateUtils");
class MyfinRateProvider {
    fetch(currency, date) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `https://myfin.by/currency/${currency.toLowerCase()}/${DateUtils_1.default.format(date)}`;
            let response = yield axios_1.default.get(url);
            if (!response.data) {
                throw new Error('Data from Myfin is empty');
            }
            let rates = [];
            let $ = cheerio.load(response.data);
            let table = $('.rates-table-sort');
            if (table) {
                if (table.find('.tr-tb').length == 0) {
                    return [];
                }
                table.find('.tr-tb').each((index, el) => {
                    let cell = $(el);
                    rates.push({
                        currency: currency,
                        currencyTo: 'BYN',
                        bankName: cell.find('.iconb').attr('class').split(' ')[1],
                        date: date,
                        bankSells: cell.find('td').eq(2).html(),
                        bankBuys: cell.find('td').eq(1).html()
                    });
                });
            }
            return rates;
        });
    }
    getFormattedDate(date) {
        let day = (date.getDate()).toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
}
exports.default = MyfinRateProvider;
//# sourceMappingURL=MyfinRateProvider.js.map