import React, { useEffect, useState } from "react";
import axios from "axios";

const dodaj = () => {
    let proizvod = document.getElementById("proizvod").value;
    let kolicina = document.getElementById("kolicina").value;
    axios.post("http://localhost:5000/user/nova_narudzba", {
            proizvod, kolicina, token: localStorage.getItem("token")
    }).then( res => {
        document.getElementById("kolicina").value="";
        alert("Uspesno ste dodali proizvod");
    }).catch( err => {
        alert(err.message);
    })

}


const NovaNarudzba = () => {

    const [proizvodi ,setProizvodi] = useState([]);
    const [error, setError] = useState(null); 
    useEffect(() => {
        axios.get("http://localhost:5000/user/nova_narudzba", {
            headers: { token: localStorage.getItem("token") },
        })        
        .then( res => {
            setProizvodi(res.data);
            setError(null);
        })
        .catch( err => {
            setError(err.message);
            setProizvodi(null);
        })
    }, []); 

    if (error) {
        return <h2>{error}</h2>;
    }

    if(!proizvodi){
        return <h2>Učitavanje...</h2>;
    }

    return (
        <>
            <h2>Nova narudžba</h2>
            Proizvod:
            <select id="proizvod">
                {proizvodi.map( proizvod => (
                    <option key={proizvod.id} value={proizvod.id}>
                        {`${proizvod.naziv} - ${(proizvod.cijena - (proizvod.cijena / 100) * proizvod.popust).toFixed(2)} KM`}
                    </option>
                ))}
            </select>

            <br />
            Kolicina:
            <input id = "kolicina" type="number" />
            <br />

            <button onClick={dodaj}> Dodaj </button>
            <br />

            <a href="/user"> Nazad</a>

        </>
    );
};

export default NovaNarudzba;