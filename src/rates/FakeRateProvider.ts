import RateProviderInterface from "./RateProviderInterface";
import RateInterface from "./RateInterface";


class FakeRateProvider implements RateProviderInterface {

    public async fetch(currency: string, date: Date): Promise<Array<RateInterface>> {


        let rates = [];

        rates.push({
            currency: 'USD',
            currencyTo: 'BYN',
            bankName: 'paritetbank',
            date: '2020-03-29T12:48:25.600Z',
            bankSells: 2.603,
            bankBuys: 2.583
        });

        rates.push({
            currency: 'USD',
            currencyTo: 'BYN',
            bankName: 'mtbank',
            date: '2020-03-29T12:48:25.600Z',
            bankSells: 2.63,
            bankBuys: 2.583
        });


        return rates;

    }
}

export default FakeRateProvider;