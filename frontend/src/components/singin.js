
import axios from "axios";


function Singin() {

    const f = () => {
        let ime=document.getElementById("ime").value;
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;

        if (!ime || !email || !password) 
            return alert("Nisu uneti svi podaci");
            
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) 
            return alert("Neispravan email");

        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*.,])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) 
            return alert("Neispravan password");


        axios.post('http://localhost:5000/singin', {ime, email, password})
        .then(function (response) {
            alert("Uspesno ste se registrovali");
            window.location.href = "/";
        }).catch(function (error) {
            alert("Neuspesno ste se registrovali. Pokusajete ponovo.");
            console.log(error);
        });


    }

    return (
      <>
        <h3>Ime</h3>
        <input id="ime" type="text" />
        <h3>Email</h3>
        <input id="email" type="email" />
        <h3>Password</h3>
        <input id="password" type="password" />
        <br />
        <button onClick={f} id="singin">Sing in</button>
        <p>Vec ste registrovani? <a href='/'>Vrati se nazad.</a></p>
      </>
    );
  }
  
  export default Singin;
  