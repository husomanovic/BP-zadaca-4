import axios from "axios";
import {useEffect, useState} from "react";

const Admin = () => {

    const [admin, setAdmin] = useState(null);
    const [error, setErrror] = useState(null);
    
    useEffect(() => {
        axios.get("http://localhost:5000/admin", {
            headers: { token: localStorage.getItem("token") },
        }).then((res) => {
            setAdmin(res.data);
            setErrror(null);            
        }).catch(err => {
            setErrror(err.message);
            setAdmin(null);
        });
    }, []); 

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!admin) {
        return <h2>Učitavanje...</h2>;
    }

    return (
        <>
            <h1>Sekcija za admina</h1>
            <a href="/admin/proizvodi" >Upravljanje proizvodima </a>
            <br/>
            <a href="/admin/izvjestaj" >Izvjestaj</a>
            <br/>
            <a href="/" onClick={() => localStorage.removeItem("token")}>Logout</a>
        </>
    );
}

export default Admin;