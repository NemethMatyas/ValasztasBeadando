import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./Megoldas";
import Valasztas from "./Valasztas";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");

        // Material Design Bootstrap súgó: https://mdbootstrap.com/
        // Font Awesome:
        res.write("<link rel='stylesheet' href='https://use.fontawesome.com/releases/v5.8.2/css/all.css'>");
        // Google Fonts:
        res.write("<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'>");
        // Bootstrap core CSS:
        res.write("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css'>");
        // Material Design Bootstrap:
        res.write("<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.15.0/css/mdb.min.css'>");

        res.write("<title>Valasztas</title>");
        res.write("</head>");
        res.write("<body><form><pre class='m-3'>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //1.feladat: Olvassa be a szavazatok.txt fájl adatait, majd ezek felhasználásával oldja meg a következő feladatokat!
        const params = url.parse(req.url as string, true).query;
        const megold: Megoldas = new Megoldas("szavazatok.txt");

        //2.feladat: Hány képviselőjelölt indult a helyhatósági választáson? A kérdésre egész mondatban válaszoljon az alábbi mintához hasonlóan!
        res.write("\n2. feladat:");
        res.write(`<p>A helyhatósági választásokon ${megold.Osszesindulo} képviselöltjelölt indult.</p>`);
        //3.feladat: Kérje be egy képviselőjelölt vezetéknevét és utónevét, majd írja ki a képernyőre, hogy az illető hány szavazatot kapott! Ha a beolvasott név nem szerepel a nyilvántartásban, úgy jelenjen meg a képernyőn az „Ilyen nevű képviselőjelölt nem szerepel a nyilvántartásban!” figyelmeztetés! A feladat megoldása során feltételezheti, hogy nem indult két azonos nevű képviselőjelölt a választáson.
        res.write("\n3.feladat:");
        const vezetéknév: string = params.vnev as string;
        res.write(`\nKérem a vezetéknév: <input type='text' name='vnev' value=${vezetéknév} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        const keresztnév: string = params.knev as string;
        res.write(`\nKérem a keresztnevét: <input type='text' name='knev' value=${keresztnév} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        res.write(megold.Bekeres(vezetéknév, keresztnév));
        res.write("\n");
        //4.feladat:  Határozza meg, hányan adták le szavazatukat, és mennyi volt a részvételi arány!(A részvételi arány azt adja meg, hogy a jogosultak hány százaléka vett részta szavazáson.) A részvételi arányt két tizedesjegy pontossággal, százalékos formában írja ki a képernyőre!

        res.write("\n4. feladat:");
        res.write(`<p>A választásokon\t${megold.Voksok} állampolgár, a jogosultak ${megold.Arany.toFixed(2)}%-a vett részt.</p>`);
        //5.feladat: Határozza meg és írassa ki a képernyőre az egyes pártokra leadott szavazatok arányát az összes leadott szavazathoz képest két tizedesjegy pontossággal! A független jelölteket együtt, „Független jelöltek” néven szerepeltesse!
        res.write("\n5.feladat:");
        res.write("Az egyes pártokra leadott szavazzatok aránya:");
        for (const item of megold.OsszesSzavazat) {
            res.write(`<p>\t${item} </p>`);
        }

        //6.feladat: Melyik jelölt kapta a legtöbb szavazatot? Jelenítse meg a képernyőn a képviselő vezetékés utónevét, valamint az őt támogató párt rövidítését, vagy azt, hogy független! Ha több ilyen képviselő is van, akkor mindegyik adatai jelenjenek meg!
        res.write("\n6.feladat: ");
        for (const item of megold.LegtobbSzavazat) {
            res.write(`<p>\t${item} </p>`);
        }
    }
}
