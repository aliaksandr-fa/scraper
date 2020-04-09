import {Database} from 'sqlite3';
import * as commandLineArgs from 'command-line-args';

import {Scraper} from './src/scraper';
import {BankRepository, CurrencyRepository, RateRepository} from './src/repository';
import MyfinRateProvider from './src/rates/MyfinRateProvider';
import DateType from "./src/application/cli/DateType";
import ScraperRangeInput from "./src/scraper/inputs/ScraperRangeInput";

const optionDefinitions = [
    {
        name: 'currencies',
        type: String,
        multiple: true,
        defaultValue: ['USD'],
        description: 'Currencies to scrape.',
        typeLabel: '<currencies>'
    },
    {
        name: 'date-from',
        type: date => new DateType(date),
        defaultValue: new Date(),
        description: 'Date to scrape from.',
        typeLabel: '<df>'
    },
    {
        name: 'date-to',
        type: date => new DateType(date),
        defaultValue: new Date(),
        description: 'Date to scrape to.',
        typeLabel: '<dt>'
    }
];

const options = commandLineArgs(optionDefinitions);


let input = new ScraperRangeInput(
    options['currencies'],
    options['date-from'] || new Date(),
    options['date-to'] || Date(),
);

let config = {
    concurrency: 1
};

let db = new Database('./database/currencies.db');

let scraper = new Scraper(
    new MyfinRateProvider(),
    new RateRepository(db),
    new CurrencyRepository(db),
    new BankRepository(db)
);

scraper.scrape(input, config);