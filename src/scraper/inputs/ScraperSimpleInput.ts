import ScraperInputInterface from "../ScraperInputInterface";
import ScraperJobInterface from "../ScraperJobInterface";

class ScraperSimpleInput implements ScraperInputInterface {

    protected currency: string;
    protected date: Date;

    public constructor(currency: string, date: Date) {
        this.currency = currency;
        this.date = date;
    }

    public toJobs(): Array<ScraperJobInterface> {
        return [{
            currency: this.currency,
            date: this.date
        }];
    }

    public isValid(): boolean {
        return true;
    }
}

export default ScraperSimpleInput;