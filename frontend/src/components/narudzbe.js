import React, { useEffect, useState } from "react";
import axios from "axios";

const Narudzbe = () => {
    const [narudzbe, setNarudzbe] = useState(null); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        axios.get("http://localhost:5000/user/narudzbe", {
                headers: { token: localStorage.getItem("token") },
            })
            .then((res) => {
                console.log(res);
                setNarudzbe(res.data); 
                setError(null); 
            })
            .catch((err) => {
                setError("Niste prijavljeni ili nemate pristup!"); 
                setNarudzbe(null); 
            });
    }, []); 

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!narudzbe) {
        return <h2>Učitavanje...</h2>;
    }



    return (
        <>

            <style>{`
                table, th, td {
                border: 1px solid black;
                }
            `}</style>


            <h1>Moje narudzbe</h1>
            <table>
            <thead>
                <tr>
                    <th>ID narudzbe</th>
                    <th>Datum narudzbe</th>
                    <th>Prizvod</th>
                    <th>Cijena</th>
                    <th>Kolicina</th>
                    <th>Ukupna cijena</th>
                </tr>
            </thead>
            <tbody>
                {console.log(narudzbe)}
                    {narudzbe.map(element => (
                        <tr  key={element.id}>
                            <td>{element.id}</td>
                            <td>{element.datum}</td>
                            <td>{element.proizvod}</td>
                            <td>{element.cijena}</td>
                            <td>{element.kolicina}</td>
                            <td>{element.ukupno}</td>
                        </tr>
                    ))
                }
            </tbody>
            </table>

            <a href="/user">Povratak na pocetnu</a>
        </>
    );
};

export default Narudzbe;
