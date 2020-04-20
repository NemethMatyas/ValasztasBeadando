export default class Valasztas {
    private _kerulet: number;
    private _szavazat: number;
    private _vezeteknev: string;
    private _kersztnev: string;
    private _part: string;

    constructor(sor: string) {
        const m: string[] = sor.split(" ");
        this._kerulet = parseInt(m[0]);
        this._szavazat = parseInt(m[1]);
        this._vezeteknev = m[2];
        this._kersztnev = m[3];
        this._part = m[4];
    }

    public get Kerulet(): number {
        return this._kerulet;
    }
    public get Szavazat(): number {
        return this._szavazat;
    }
    public get Vezeteknev(): string {
        return this._vezeteknev;
    }
    public get Keresztnev(): string {
        return this._kersztnev;
    }
    public get Part(): string {
        return this._part;
    }
}
