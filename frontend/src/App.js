import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Singin from './components/singin';
import User from './components/user';
import Narudzbe from "./components/narudzbe"
import NovaNarudzba from "./components/novaNarudzba"
import Admin from "./components/admin"
import Izvjestaj from "./components/izvjestaj"
import Proizvodi from "./components/proizvodi.js"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/singin" element={<Singin />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/narudzbe" element={<Narudzbe/>} />
        <Route path="/user/nova_narudzba" element={<NovaNarudzba />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/izvjestaj" element={<Izvjestaj />} />
        <Route path="/admin/proizvodi" element={<Proizvodi />} />

      </Routes>
    </Router>
  );
};

export default App;
