"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = require("sqlite3");
const commandLineArgs = require("command-line-args");
const scraper_1 = require("./src/scraper");
const repository_1 = require("./src/repository");
const MyfinRateProvider_1 = require("./src/rates/MyfinRateProvider");
const DateType_1 = require("./src/application/cli/DateType");
const ScraperRangeInput_1 = require("./src/scraper/inputs/ScraperRangeInput");
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
        type: date => new DateType_1.default(date),
        defaultValue: new Date(),
        description: 'Date to scrape from.',
        typeLabel: '<df>'
    },
    {
        name: 'date-to',
        type: date => new DateType_1.default(date),
        defaultValue: new Date(),
        description: 'Date to scrape to.',
        typeLabel: '<dt>'
    }
];
const options = commandLineArgs(optionDefinitions);
let input = new ScraperRangeInput_1.default(options['currencies'], options['date-from'] || new Date(), options['date-to'] || Date());
let config = {
    concurrency: 1
};
let db = new sqlite3_1.Database('./database/currencies.db');
let scraper = new scraper_1.Scraper(new MyfinRateProvider_1.default(), new repository_1.RateRepository(db), new repository_1.CurrencyRepository(db), new repository_1.BankRepository(db));
scraper.scrape(input, config);
//# sourceMappingURL=index.js.map