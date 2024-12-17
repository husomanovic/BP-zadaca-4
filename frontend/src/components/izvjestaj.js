import axios from "axios"
import { useEffect, useState } from "react"

const Izvjestaj = () => {
    const [izvjestaj, setIzvjestaj] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:5000/admin/izvjestaj",
            {headers: { token: localStorage.getItem("token") }},)
            .then((res) => {
                setIzvjestaj(res.data);
                setError(null);
            }).catch((err) => {
                setError(err.message);
                setIzvjestaj(null);

            });
    }, []);


    if (error) {
        return <h2>{error}</h2>;
    }
    if (!izvjestaj) {
        return <h2>Učitavanje...</h2>;
    }

    return (
        <>    
            <style>{`
                table, th, td {
                border: 1px solid black;
                }
            `}</style>

            <h1>Izvjestaj o narudzbe</h1>


            <table>
                <thead>
                    <tr>
                        <th>ID </th>
                        <th>Datum narudzbe</th>
                        <th>Korisnik id</th>
                        <th>Ukupna cijena</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        izvjestaj.map((izvjestaj) => (
                            <tr key={izvjestaj.id}>
                                <td>{izvjestaj.id}</td>
                                <td>{izvjestaj.datum}</td>
                                <td>{izvjestaj.korisnik}</td>
                                <td>{izvjestaj.cjena}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <a href="/admin"> povratka na pocetnu</a>
        </>
    )
}


export default Izvjestaj