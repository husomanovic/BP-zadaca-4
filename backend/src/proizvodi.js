import express from "express";
import { db } from "./db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const proizvodi = express.Router();

proizvodi.get('/', (req, res) => {

    const token = req.headers.token;
    if (!token) 
        res.status(500).json({ message: "Došlo je do greške " });
    
    const SECRET_KEY = process.env.SECRET_KEY;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err || decoded.email !="admin@pmf.unsa.ba" ) 
            res.status(500).json({ message: "Došlo je do greške " });
        
        let sql = "SELECT id, naziv, cijena, zaliha FROM PROIZVOD";
        db.query(sql, (err, result) => {
            if (err) 
                res.status(500).json({ message: "Došlo je do greške " });
                 
            res.json(result);
        });
    });
})


proizvodi.post('/', (req, res) => {

    const { naziv, cijena, zaliha, token} = req.body;

    if (!token) 
        res.status(500).json({ message: "Došlo je do greške " });
    
    const SECRET_KEY = process.env.SECRET_KEY;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err || decoded.email !="admin@pmf.unsa.ba" ) 
            res.status(500).json({ message: "Došlo je do greške " });
        
        let sql = "INSERT INTO PROIZVOD (naziv, cijena, zaliha) VALUES (?, ?, ?)";
        db.query(sql, [naziv, cijena, zaliha],(err, result) => {
            if (err) 
                res.status(500).json({ message: "Došlo je do greške " });
                 
            res.json(result);
        });
    });
})



proizvodi.delete('/:id', (req, res) => {

    const token = req.headers.token;
    if (!token) 
        res.status(500).json({ message: "Došlo je do greške " });
    
    const SECRET_KEY = process.env.SECRET_KEY;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err || decoded.email !="admin@pmf.unsa.ba" ) 
            res.status(500).json({ message: "Došlo je do greške " });
        
        let sql = "DELETE FROM PROIZVOD WHERE id = ?";
        db.query(sql, [req.params.id], (err, result) => {
            if (err) 
                res.status(500).json({ message: "Za dati proizvod postoji stavka narudzbe  " });
                 
            res.json(result);
        });
    });
})

export default proizvodi