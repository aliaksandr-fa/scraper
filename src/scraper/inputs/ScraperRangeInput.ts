import ScraperInputInterface from "./../ScraperInputInterface";
import ScraperJobInterface from "../ScraperJobInterface";

class ScraperRangeInput implements ScraperInputInterface {

    protected currencies: Array<string>;
    protected dateFrom: Date;
    protected dateTo: Date;

    public constructor(currencies: Array<string>, dateFrom: Date, dateTo: Date) {
        this.currencies = currencies;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
    }

    public toJobs(): Array<ScraperJobInterface> {

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
           })
        });

        return jobs;
    }

    protected normalizeDate(date: Date): Date {
        date.setHours(23, 59, 59, 59);
        return date;
    }

    // public validate(silent: boolean = true): Array<string> {
    //
    //     let errors = [];
    //
    //     if (ScraperRangeInput.DATE_REGEXP.test(this.dateFrom)) {
    //         errors.push('Date from has wrong format. Correct one is DD-MM-YYYY');
    //     }
    //
    //     if (ScraperRangeInput.DATE_REGEXP.test(this.dateTo)) {
    //         errors.push('Date to has wrong format. Correct one is DD-MM-YYYY');
    //     }
    //
    //     if (this.currencies.length == 0) {
    //         errors.push('Currencies list is Empty.');
    //     }
    //
    //     if (!silent && errors.length > 0) {
    //         throw new Error(errors.join(' '));
    //     }
    //
    //     return errors;
    // }
}

export default ScraperRangeInput;