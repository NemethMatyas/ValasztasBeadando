import fs from "fs";
import Megoldas from "../Megoldas";
import Valasztas from "../Valasztas";

describe("Megoldás osztály unit tesztek", () => {
    const instance: Megoldas = new Megoldas("szavazatok.txt");

    it("Megoldás osztálypéldány ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Megoldas);
    });

    it("Indulok száma", async () => {
        expect(instance.Osszesindulo).toBe(40);
    });

    it("Szavazatokszáma száma", async () => {
        expect(instance.Voksok).toBe(4713);
    });

    it("Részvételi arány", async () => {
        expect(instance.Arany).toBe(38.17739975698664);
    });

    it("Egyes pártokra leadott szavazatok aránya", async () => {
        const partok: string[] = ["Gyümölcsevők Pártja = 16.35900700190961%", "Húsevők Pártja = 24.591555272650115%", "Tejivók Szövetsége = 21.493740717165288%", "Zöldségevők Pártja =20.02970507107999%", "Független jelöltek = 17.52599193719499%"];
        for (let i = 0; i < partok.length; i++) {
            expect(instance.OsszesSzavazat[i]).toBe(partok[i]);
        }
    });
    it("Induló keresése", async () => {
        const indulokeres: string[] = ["Joghurt Jakab független", "Narancs Edmond független", "Vadas Marcell független"];
        for (let i = 0; i < indulokeres.length; i++) {
            expect(instance.LegtobbSzavazat[i]).toBe(indulokeres[i]);
        }
    });
});
