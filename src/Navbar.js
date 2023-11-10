import React from 'react';
import './Navbar.css';
import geo from './images/geo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  return (
    <div className="row">
      <div className="col-2 navbar1">
        <img className="logo" src={geo}/>
        <nav className="navbar">
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FontAwesomeIcon icon="house" />
                  Accueil
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FontAwesomeIcon icon="newspaper" />
                  Actualité
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FontAwesomeIcon icon={"faTable"} />
                  PortFolio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Personnel</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="col-10">
       
      </div>
    </div>
  );
}

export default Navbar;