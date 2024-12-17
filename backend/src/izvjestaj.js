import { db } from "./db.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const izvjestaj = (req ,res) => {

    const token = req.headers.token;

    if(!token)
        res.status(500).json({ message: "Došlo je do greške " });

    const SECRET_KEY = process.env.SECRET_KEY;

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err)
            res.status(500).json({ message: "Došlo je do greške " });

        if(decoded.email !="admin@pmf.unsa.ba" )
            res.status(500).json({ message: "Došlo je do greške " });

        const sql =`select sn.id ,n.datum_kreiranja as datum,n.id_korisnika AS korisnik ,(p.cijena*sn.kolicina) as cjena
            FROM STAVKE_NARUDZBE sn
            JOIN NARUDZBA n ON sn.id_narudzbe=n.id 
            JOIN PROIZVOD p ON sn.id_proizvoda=p.id
        `;

        db.query(sql, (err, result) => {
            if(err)
                res.status(500).json({ message: "Došlo je do greške " });
            
            res.json(result);
        })
    })
    
}

export default izvjestaj;