import axios from "axios";

const f = () => {
  let email=document.getElementById("email").value;
  let password=document.getElementById("password").value;
  let token;

  axios.post('http://localhost:5000/login', {email, password})
  .then( (res) => {
      if (res.status !== 200) 
        return alert("Pokusajte ponovo.");

      
      token=res.data.token;
      localStorage.setItem('token', token);
      console.log(res.data);
      if(email==="admin@pmf.unsa.ba"){
        window.location.href = "/admin";
      }else{
        window.location.href = "/user";
      }

  }).catch((err) => {
    return alert("Pokusajte ponovo.");
  });

}




function Login() {
  return (
    <>
      <h3>Email</h3>
      <input id="email" type="email" />
      <h3>Password</h3>
      <input id="password" type="password" />
      <br />
      <button onClick={f} id="login">Login</button>
      <p>Niste registrovani? <a href='/singin'>Registruj se.</a></p>
    </>
  );
}

export default Login;
