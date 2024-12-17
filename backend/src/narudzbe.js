import { db } from "./db.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const narudzbe = (req ,res) => {

    const token = req.headers.token;
    if (!token) {
        throw new Error("Niste prijavljeni");
    }
    const SECRET_KEY = process.env.SECRET_KEY;

    jwt.verify(token, SECRET_KEY, function(err, decoded) {
        if (err) {
            throw new Error("Niste prijavljeni");
        } 

        let sql= `select sn.id ,n.datum_kreiranja as datum,p.naziv as proizvod, p.cijena ,sn.kolicina ,(p.cijena*sn.kolicina) as ukupno
            FROM STAVKE_NARUDZBE sn
            JOIN NARUDZBA n ON sn.id_narudzbe=n.id AND n.id_korisnika=?
            JOIN PROIZVOD p ON sn.id_proizvoda=p.id
            `;
        db.query(sql,[decoded.id], (err, result) => {
            if (err) {
                throw new Error("Niste prijavljeni");
                
            }
            res.json(result);
        })
    })
}

export default narudzbe