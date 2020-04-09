interface RateInterface {
    currency: string;
    currencyTo: string;
    bankName: string;
    date: Date;
    bankSells: number;
    bankBuys: number
}

export default RateInterface;