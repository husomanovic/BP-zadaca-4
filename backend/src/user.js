import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();

const user = (req, res) => {
    const token = req.headers.token;
    if (!token) {
        res.status(500).json({ message: "Došlo je do greške " });
    }

    const SECRET_KEY = process.env.SECRET_KEY;

    jwt.verify(token, SECRET_KEY, function(err, decoded) {
        if (err) {
            res.status(500).json({ message: "Došlo je do greške " });
        } else {
            res.json({message: "Uspesno ste se prijavili",status: 200, ime: decoded.ime, email: decoded.email})
        }
    });
}


export default user;