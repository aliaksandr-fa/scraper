import * as tress from 'tress';
import {v4 as uuidv4} from 'uuid';
import * as chalk from 'chalk';

import ScraperInputInterface from "./ScraperInputInterface";
import ScraperConfigInterface from "./ScraperConfigInterface";
import RateProviderInterface from "../rates/RateProviderInterface";
import RateRepository from "../repository/RateRepository";
import CurrencyRepository from "../repository/CurrencyRepository";
import BankRepository from "../repository/BankRepository";
import Currency from "../models/Currency";
import Rate from "../models/Rate";
import Bank from "../models/Bank";
import DateUtils from "../utils/DateUtils";

class Scraper {

    protected queue: tress.TressStatic;

    protected rateProvider: RateProviderInterface;
    protected rateRepository: RateRepository;
    protected currencyRepository: CurrencyRepository;
    protected bankRepository: BankRepository;

    public constructor(
        rateProvider: RateProviderInterface,
        rateRepository: RateRepository,
        currencyRepository: CurrencyRepository,
        bankRepository: BankRepository) {

        this.rateProvider = rateProvider;
        this.rateRepository = rateRepository;
        this.currencyRepository = currencyRepository;
        this.bankRepository = bankRepository;
    }

    public scrape(input: ScraperInputInterface, config: ScraperConfigInterface): void {

        this.bootstrap(config);

        // @todo: make as promise and do db.close at the end

        input
            .toJobs()
            .forEach(job => this.queue.push(job as any))
        ;
    }

    protected bootstrap(config: ScraperConfigInterface): void {

        this.queue = tress(async (job: { currency: string, date: Date }, done) => {

            let isCurrencySupported = await this.currencyRepository.hasCurrency(job.currency);

            if (!isCurrencySupported) {
                throw new Error(`Currency is not supported: ${job.currency}`);
            }

            let rates = [];

            try {
                rates = await this.rateProvider.fetch(job.currency, job.date);
            } catch (e) {
                console.log(`${chalk.white.bold.bgYellow(' WARNING ')} ${e.toString()}`);
                console.log(`${chalk.white.bold.bgYellow(' WARNING ')} Rescheduling the job: [${job.currency} ${DateUtils.format(job.date)}]`);
                return done(true);
            }


            for (let i = 0; i < rates.length; i++) {

                let rate = rates[i];
                let bank = await this.bankRepository.getByName(rate.bankName);

                if (!bank) {
                    bank = await this.bankRepository.save(new Bank(null, rate.bankName));
                }

                let isDuplicatedRate = await this.rateRepository.hasRate(
                    bank,
                    new Currency(rate.currency),
                    new Currency(rate.currencyTo), new Date(rate.date)
                );

                if (!isDuplicatedRate) {
                    this.rateRepository.save(new Rate(
                        uuidv4(),
                        new Currency(rate.currency),
                        new Currency(rate.currencyTo),
                        rate.bankSells,
                        rate.bankBuys,
                        bank,
                        new Date(rate.date)
                    ));
                }
            }

            done(null, job);

        }, config.concurrency);

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
            let date = DateUtils.format(data.date);

            console.log(`${status} ${currency} at ${date}`);

            this.queue.concurrency = config.concurrency;
        }
    }
}

export default Scraper;