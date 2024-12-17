import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const admin = (req, res) => {

    const token = req.headers.token;
    if (!token) 
        res.status(500).json({ message: "Došlo je do greške " });
    
    const SECRET_KEY = process.env.SECRET_KEY;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        
        if (err) 
            res.status(500).json({ message: "Došlo je do greške " });
        
        if(decoded.email !== "admin@pmf.unsa.ba" )
            res.status(500).json({ message: "Došlo je do greške " });

        res.json({message: "Uspesno ste se prijavili",status: 200, ime: decoded.ime, email: decoded.email})
    });
    
}

export default admin;