import Valasztas from "../Valasztas";

describe("Választás osztály unit tesztek:", () => {
    const instance: Valasztas = new Valasztas("6 13 Karfiol Ede TISZ");
    it("Választás osztálypédény ellenőrzése", async () => {
        expect(instance).toBeInstanceOf(Valasztas);
    });
    it("Választás kerület", async () => {
        expect(instance.Kerulet).toBe(6);
    });
    it("Választás szavazat", async () => {
        expect(instance.Szavazat).toBe(13);
    });
    it("Választás Vezetéknév", async () => {
        expect(instance.Vezeteknev).toBe("Karfiol");
    });
    it("Választás Keresztnév", async () => {
        expect(instance.Keresztnev).toBe("Ede");
    });
    it("Választás Párt", async () => {
        expect(instance.Part).toBe("TISZ");
    });
});
