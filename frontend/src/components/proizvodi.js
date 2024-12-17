import axios from "axios";
import { useEffect, useState } from "react";


const f = () => {
    axios.post(`http://localhost:5000/admin/proizvodi`, {
        naziv: document.getElementById("naziv").value,
        cijena: document.getElementById("cijena").value,
        zaliha: document.getElementById("zaliha").value,
        token: localStorage.getItem("token")
    }).then( res => {
        document.getElementById("naziv").value = "";
        document.getElementById("cijena").value = "";
        document.getElementById("zaliha").value = "";
        window.location.href = "/admin/proizvodi";
    }).catch( err => {
        alert(err.message);
    })
}

const d = (id) => {
    axios.delete(`http://localhost:5000/admin/proizvodi/${id}`, {
        headers: { token: localStorage.getItem("token") },
    }).then( res => {
        window.location.href = "/admin/proizvodi";
    }).catch( err => {
        alert(err.response.data.message);
    })
}


const Proizvodi = () => {


    const [proizvodi, setProizvodi] = useState(null);
    const [error, setError] = useState(null); 

    useEffect(() => {
        axios.get("http://localhost:5000/admin/proizvodi", {
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
            <style>{`
                table, th, td {
                border: 1px solid black;
                }
            `}</style>
            <h2>Proizvodi</h2>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Naziv</th>
                        <th>Cijena</th>
                        <th>Zaliha</th>
                        <th>Obrisi</th>
                    </tr>
                </thead>
                <tbody>
                    {proizvodi.map((proizvod) => (
                        <tr key={proizvod.id}>
                            <td>{proizvod.id}</td>
                            <td>{proizvod.naziv}</td>
                            <td>{proizvod.cijena}</td>
                            <td>{proizvod.zaliha}</td>
                            <td><button onClick={() =>{if(window.confirm('Delete the item?')) d(proizvod.id)}}>Obrisi</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

        <h3>Dodaj novi proizvod</h3>
        naziv: <input id="naziv" type="text"/><br/>
        cijena: <input id="cijena" type="number"/><br/>
        zaliha: <input id="zaliha" type="number"/><br/>
        <button onClick={f}>Dodaj</button>

        <br/>

        <a href="/admin"> Povratak na pocetnu</a>

        </> 
    )
    
}

export default Proizvodi