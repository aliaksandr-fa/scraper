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
const tress = require("tress");
const uuid_1 = require("uuid");
const chalk = require("chalk");
const Currency_1 = require("../models/Currency");
const Rate_1 = require("../models/Rate");
const Bank_1 = require("../models/Bank");
const DateUtils_1 = require("../utils/DateUtils");
class Scraper {
    constructor(rateProvider, rateRepository, currencyRepository, bankRepository) {
        this.rateProvider = rateProvider;
        this.rateRepository = rateRepository;
        this.currencyRepository = currencyRepository;
        this.bankRepository = bankRepository;
    }
    scrape(input, config) {
        this.bootstrap(config);
        // @todo: make as promise and do db.close at the end
        input
            .toJobs()
            .forEach(job => this.queue.push(job));
    }
    bootstrap(config) {
        this.queue = tress((job, done) => __awaiter(this, void 0, void 0, function* () {
            let isCurrencySupported = yield this.currencyRepository.hasCurrency(job.currency);
            if (!isCurrencySupported) {
                throw new Error(`Currency is not supported: ${job.currency}`);
            }
            let rates = [];
            try {
                rates = yield this.rateProvider.fetch(job.currency, job.date);
            }
            catch (e) {
                console.log(`${chalk.white.bold.bgYellow(' WARNING ')} ${e.toString()}`);
                console.log(`${chalk.white.bold.bgYellow(' WARNING ')} Rescheduling the job: [${job.currency} ${DateUtils_1.default.format(job.date)}]`);
                return done(true);
            }
            for (let i = 0; i < rates.length; i++) {
                let rate = rates[i];
                let bank = yield this.bankRepository.getByName(rate.bankName);
                if (!bank) {
                    bank = yield this.bankRepository.save(new Bank_1.default(null, rate.bankName));
                }
                let isDuplicatedRate = yield this.rateRepository.hasRate(bank, new Currency_1.default(rate.currency), new Currency_1.default(rate.currencyTo), new Date(rate.date));
                if (!isDuplicatedRate) {
                    this.rateRepository.save(new Rate_1.default(uuid_1.v4(), new Currency_1.default(rate.currency), new Currency_1.default(rate.currencyTo), rate.bankSells, rate.bankBuys, bank, new Date(rate.date)));
                }
            }
            done(null, job);
        }), config.concurrency);
        this.queue.drain = () => {
            console.log(chalk.white.bold.bgGreen(' DONE '));
        };
        this.queue.error = (err) => {
            console.log(`chalk.white.bold.bgGreen(' FAILED ') ${err}`);
        };
        this.queue.retry = () => {
            this.queue.concurrency = -500;
        };
        this.queue.success = (data) => {
            let status = chalk.white.bgGreen(' PROCESSED ');
            let currency = chalk.black.bgWhite(data.currency);
            let date = DateUtils_1.default.format(data.date);
            console.log(`${status} ${currency} at ${date}`);
            this.queue.concurrency = config.concurrency;
        };
    }
}
exports.default = Scraper;
//# sourceMappingURL=Scraper.js.map