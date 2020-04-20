import fs from "fs";
import Valasztas from "./Valasztas";
import { ok } from "assert";

export default class Megoldas {
    private Valasztasok: Valasztas[] = [];

    constructor(forrás: string) {
        fs.readFileSync(forrás)
            .toString()
            .split("\n")
            .forEach(i => {
                const aktSort = i.trim();
                if (aktSort.length > 0) this.Valasztasok.push(new Valasztas(aktSort));
            });
    }
    public get Osszesindulo(): number {
        let db = 0;
        for (const i of this.Valasztasok) {
            db++;
        }
        return db;
    }
    public get Arany(): number {
        let db = 0;
        let eredmeny = 0;
        for (const i of this.Valasztasok) {
            db += i.Szavazat;
        }
        eredmeny = (db / 12345) * 100;
        return eredmeny;
    }
    public get Voksok(): number {
        let db = 0;
        for (const i of this.Valasztasok) {
            db += i.Szavazat;
        }
        return db;
    }
    public get OsszesSzavazat(): Array<string> {
        let gyep = 0;
        let hep = 0;
        let tisz = 0;
        let zep = 0;
        let flen = 0;
        const eredmeny: string[] = [];

        for (let i = 0; i < this.Valasztasok.length; i++) {
            if (this.Valasztasok[i].Part == "GYEP") gyep += this.Valasztasok[i].Szavazat;
            if (this.Valasztasok[i].Part == "HEP") hep += this.Valasztasok[i].Szavazat;
            if (this.Valasztasok[i].Part == "TISZ") tisz += this.Valasztasok[i].Szavazat;
            if (this.Valasztasok[i].Part == "ZEP") zep += this.Valasztasok[i].Szavazat;
            if (this.Valasztasok[i].Part == "-") flen += this.Valasztasok[i].Szavazat;
        }

        eredmeny.push("Gyümölcsevők Pártja = " + (100 * gyep) / this.Voksok + "%");
        eredmeny.push("Húsevők Pártja = " + (100 * hep) / this.Voksok + "%");
        eredmeny.push("Tejivók Szövetsége = " + (100 * tisz) / this.Voksok + "%");
        eredmeny.push("Zöldségevők Pártja =" + (100 * zep) / this.Voksok + "%");
        eredmeny.push("Független jelöltek = " + (100 * flen) / this.Voksok + "%");
        return eredmeny;
    }
    public get LegtobbSzavazat(): Array<string> {
        const szavazatok: number[] = [];
        for (const i of this.Valasztasok) {
            szavazatok.push(i.Szavazat);
        }
        const max = Math.max(...szavazatok.map(O => O));
        const eredmeny: string[] = [];
        for (const i of this.Valasztasok) {
            if (max === i.Szavazat) {
                if (i.Part === "-") {
                    eredmeny.push(i.Vezeteknev + " " + i.Keresztnev + " " + i.Part);
                } else {
                    eredmeny.push(i.Vezeteknev + " " + i.Keresztnev + " független");
                }
            }
        }
        return eredmeny;
    }
    public Bekeres(veznev: string, utonev: string): string {
        let eredmeny = "";
        let szerepel = false;
        for (let i = 0; i < this.Valasztasok.length; i++) {
            if (this.Valasztasok[i].Vezeteknev == veznev && this.Valasztasok[i].Keresztnev == utonev) {
                eredmeny = veznev + " " + utonev + "  képviselőjelölt " + this.Valasztasok[i].Szavazat + " szavazatot kapott";
                szerepel = true;
                break;
            }
        }
        if (!szerepel) eredmeny = " Ilyen nevű képviselőjelölt nem szerepel a nyilvántartásban!";
        return eredmeny;
    }
}
