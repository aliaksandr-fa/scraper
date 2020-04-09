import ScraperRangeInput from '../../../src/scraper/inputs/ScraperRangeInput';


describe('ScraperRangeInput tests.', () => {

    test('ScraperRangeInput creates correct range of jobs.', async done => {

        let input = new ScraperRangeInput(
            ['USD', 'CAD'],
            new Date('2020-03-20T14:27:16.603Z'),
            new Date('2020-03-21T14:27:16.603Z')
        );

        let jobs = input.toJobs();

        expect(jobs.length).toBe(4);
        expect(jobs).toStrictEqual([
            {"currency": 'USD', "date": new Date("2020-03-20T20:59:59.059Z")},
            {"currency": 'USD', "date": new Date("2020-03-21T20:59:59.059Z")},
            {"currency": 'CAD', "date": new Date("2020-03-20T20:59:59.059Z")},
            {"currency": 'CAD', "date": new Date("2020-03-21T20:59:59.059Z")}
        ]);

        input = new ScraperRangeInput(
            ['USD', 'CAD'],
            new Date('2020-03-20T14:27:16.603Z'),
            new Date('2020-03-20T14:27:16.603Z')
        );

        jobs = input.toJobs();
        expect(jobs.length).toBe(2);
        expect(jobs).toStrictEqual([
            {"currency": 'USD', "date": new Date("2020-03-20T20:59:59.059Z")},
            {"currency": 'CAD', "date": new Date("2020-03-20T20:59:59.059Z")}
        ]);

        input = new ScraperRangeInput(
            ['USD'],
            new Date('2019-12-30T14:27:17.603Z'),
            new Date('2020-01-02T14:27:16.603Z')
        );

        jobs = input.toJobs();
        expect(jobs.length).toBe(4);

        input = new ScraperRangeInput(
            ['USD', 'CAD'],
            new Date('2020-03-20T14:27:17.603Z'),
            new Date('2020-03-20T14:27:16.603Z')
        );

        jobs = input.toJobs();
        expect(jobs.length).toBe(0);

        done();
    });
});