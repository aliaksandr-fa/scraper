import MyfinRateProvider from '../../src/rates/MyfinRateProvider';


describe('MyfinRateProvider tests.', () => {

    test('MyfinRateProvider fetches rates.', async done => {
        let myfinRateProvider = new MyfinRateProvider();
        let rates = await myfinRateProvider.fetch('USD', new Date('2020-03-20T00:01:00'));

        expect(rates).toEqual(
            expect.arrayContaining([
                    expect.objectContaining({
                        "bankBuys": "2.61",
                        "bankName": "absolutbank",
                        "bankSells": "2.68",
                        "currency": "USD",
                        "currencyTo": "BYN"
                    })
                ]
            ))
        ;

        done();
    });
});