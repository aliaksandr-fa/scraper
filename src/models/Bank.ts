class Bank {

    protected id: number|null;
    protected name: string;

    public constructor(id: number|null, name: string) {
        this.id = id;
        this.name = name;
    }

    public getId(): number|null {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }
}

export default Bank;