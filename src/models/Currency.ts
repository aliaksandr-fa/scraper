class Currency {

    protected code: string;
    protected name?: string;
    protected symbol?: string;

    public constructor(code: string, name?: string, symbol?: string) {
        this.code = code;
        this.name = name;
        this.symbol = symbol;
    }

    public getCode(): string {
        return this.code;
    }

    public getName(): string {
        return this.name;
    }

    public getSymbol(): string {
        return this.symbol;
    }
}

export default Currency;