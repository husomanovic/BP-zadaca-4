import { db } from "./db.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const novaNarudzba = express.Router();


novaNarudzba.get('/', (req, res) => {
    const token = req.headers.token;
    if (!token) 
        res.status(500).json({ message: "Došlo je do greške " });
    
    const SECRET_KEY = process.env.SECRET_KEY;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) 
            res.status(500).json({ message: "Došlo je do greške " });


        let sql = "SELECT id, naziv, cijena, popust FROM PROIZVOD";
        db.query(sql, (err, result) => {
            if (err) 
                res.status(500).json({ message: "Došlo je do greške " });
                 
            res.json(result);
        });
    });
})



novaNarudzba.post('/', (req, res) => {
    const { proizvod, kolicina, token } = req.body;

    if (!token) 
        res.status(500).json({ message: "Došlo je do greške " });
    
    const SECRET_KEY = process.env.SECRET_KEY;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) 
            res.status(500).json({ message: "Došlo je do greške " });
        
        const sql = "INSERT INTO NARUDZBA (id_korisnika) VALUES (?)";
        db.query(sql, [decoded.id], (err, result) => {
            if(err) 
                res.status(500).json({ message: "Došlo je do greške " });

            const sql2 = "INSERT INTO STAVKE_NARUDZBE (id_narudzbe, id_proizvoda, kolicina) VALUES (?, ?, ?)";
            db.query(sql2, [result.insertId, proizvod, kolicina], (err, result2) => {
                if(err) 
                    res.status(500).json({ message: "Došlo je do greške " });
                
                res.status(200).json({
                    message: "Uspesno ste narucili proizvod",
                    status: 200
                });                
            })

        });
    });
})


export default novaNarudzba;