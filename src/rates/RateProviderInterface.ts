import RateInterface from './RateInterface';

interface RateProviderInterface {
    fetch(currency: string, date: Date): Promise<Array<RateInterface>>;
}

export default RateProviderInterface