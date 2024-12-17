import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
    const [userData, setUserData] = useState(null); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        axios.get("http://localhost:5000/user", {
                headers: { token: localStorage.getItem("token") },
            })
            .then((res) => {
                setUserData(res.data); 
                setError(null); 
            })
            .catch((err) => {
                setError("Niste prijavljeni ili nemate pristup!"); 
                setUserData(null); 
            });
    }, []); 

    if (error) {
        return <h2>{error}</h2>;
    }

    if (!userData) {
        return <h2>Učitavanje...</h2>;
    }

    return (
        <>
            <h1>Uspesno ste se ulogovali</h1>
            <p>Ime: {userData.ime}</p>
            <p>Email: {userData.email}</p>
            <a href="/user/nova_narudzba">Nova narudzba</a><br/>
            <a href="/user/narudzbe">Moje narudzbe</a><br/>
            <a href="/" onClick={() => localStorage.removeItem("token")}>Logout</a>
        </>
    );
};

export default User;
