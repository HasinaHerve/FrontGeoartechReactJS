import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Accueil from './Accueil';
import Actualite from './Actualite';
import Portfolio from './Portfolio';
import Personnel from './Personnel';
import AjouterActualite from './AjouterActualite';
import ModifierActualite from './ModifierActualite';
import AjouterPortfolio from './AjouterPortfolio';
import ModifierPortfolio from './ModifierPortfolio';
import AjouterPersonnel from './AjouterPersonnel';
import ModifierPersonnel from './ModifierPersonnel';
import Login from './Login';

const Routeur = () => {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="accueil" element={<Accueil />} />
            <Route path="actualite" element={<Actualite />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="personnel" element={<Personnel />} />
            <Route path="ajouterActualite" element={<AjouterActualite />} />
            <Route path="modifierActualite/:id" element={<ModifierActualite />} />
            <Route path="ajouterPortfolio" element={<AjouterPortfolio />} />
            <Route path="modifierPortfolio/:id" element={<ModifierPortfolio />} />
            <Route path="ajouterPersonnel" element={<AjouterPersonnel />} />
            <Route path="modifierPersonnel/:id" element={<ModifierPersonnel />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routeur;