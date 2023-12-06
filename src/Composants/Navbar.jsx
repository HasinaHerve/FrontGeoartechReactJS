import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import geo from '../images/geo.jpg';
import '../css/Navbar.css';

const Navbar = () => {
  return (
    <>
        <div className="container-fluid">
            <div className="row">
                <nav className="navbar navbar-expand-lg navbar-light shadow fixed-top">
                    <a><img className="logo" src={geo}/></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="nav justify-content-center">
                            <li className="nav-item">
                                <Link to="/Accueil" className="nav-link"><FontAwesomeIcon icon="house" />&nbsp;Accueil</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Actualite" className="nav-link"><FontAwesomeIcon icon="newspaper" />&nbsp;Actualité</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Portfolio" className="nav-link"><FontAwesomeIcon icon={"briefcase"} />&nbsp;PortFolio</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Personnel" className="nav-link"><FontAwesomeIcon icon={"users"} />&nbsp;Personnel</Link>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"><FontAwesomeIcon icon="user" />&nbsp;Admin</a>
                                <ul class="dropdown-menu">
                                    <li><Link to="/Personnel" className="dropdown-item nav-link">Ajouter</Link></li>
                                    <li><Link to="/Login" className="dropdown-item nav-link">Se déconnecter</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
      <Outlet />
    </>
  )
};

export default Navbar;
