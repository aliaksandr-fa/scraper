import axios from 'axios';
import * as cheerio from 'cheerio';

import RateProviderInterface from "./RateProviderInterface";
import RateInterface from "./RateInterface";
import DateUtils from "../utils/DateUtils";


class MyfinRateProvider implements RateProviderInterface {

    public async fetch(currency: string, date: Date): Promise<Array<RateInterface>> {

        let url = `https://myfin.by/currency/${currency.toLowerCase()}/${DateUtils.format(date)}`;
        let response = await axios.get(url);

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

    }

    protected getFormattedDate(date: Date): string {
        let day = (date.getDate()).toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }
}

export default MyfinRateProvider;