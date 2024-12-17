import express from 'express';
import cors from'cors';
import {login, singin} from "./src/login.js ";
import user  from "./src/user.js ";
import narudzbe  from "./src/narudzbe.js ";
import novaNarudzba from './src/novaNarudzba.js'
import admin from './src/admin.js'
import izvjestaj from './src/izvjestaj.js';
import prizvodi from './src/proizvodi.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 



app.post("/login", login);
app.post("/singin", singin);

app.get("/user",user);
app.get("/user/narudzbe",narudzbe);
app.use('/user/nova_narudzba', novaNarudzba)

app.get("/admin",admin)
app.get("/admin/izvjestaj",izvjestaj)
app.use('/admin/proizvodi',prizvodi)

app.listen(5000, () => {
    console.log("Server started on port 5000");
});