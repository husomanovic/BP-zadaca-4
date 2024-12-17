import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { db } from "./db.js";


dotenv.config();
const login =(req, res) => {
    const { email, password} = req.body;

    if (!email || !password) 
        return res.json({message: "Nisu uneti svi podaci",status: 400});

    const sql = "SELECT * FROM KORISNIK WHERE email = ?";
    db.query(sql, [email], (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err);
            
        }
        if (result.length == 0) {
            return res.json({message: "Niste registrovani",status: 400});
        }

        let user = result[0];

        bcrypt.compare(password, user.lozinka, (err, result) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            if (!result) {
                return res.status(400).json({message: "Neispravan password",status: 400});
            }
            const SECRET_KEY = process.env.SECRET_KEY;
            const token = jwt.sign({ id: user.id, ime: user.ime, email: user.email}, SECRET_KEY, {expiresIn: "48h",});
            res.json({message: "Uspesno ste se ulogovali",status: 200, token});     
        
        });
    });
}

const singin = (req, res) => {  
    const {ime, email, password} = req.body;
    console.log(ime,email,password);
    if (!ime || !email || !password) 
        return res.json({message: "Nisu uneti svi podaci",status: 400});

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*.,])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) 
        return res.json({message: "Neispravan password",status: 400});

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(email)) 
        return res.json({message: "Neispravan email",status: 400});

    
    bcrypt.hash(password, 10, (err, hash) => {
		if (err) {
            res.status(500).json({ message: "Došlo je do greške " });
		} else {
			const sql = "INSERT INTO KORISNIK (ime, email, lozinka) VALUES (?, ?, ?)";
            db.query(sql, [ime, email, hash], (err, result) => {
                if (err) {
                    console.log(err);
                    res.json(err);
                }
                console.log("res\n\n\n");
                console.log(result);
                res.json(result); 
            })
		}
	});

}

export {login, singin};