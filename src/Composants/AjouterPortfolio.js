import React, { useState } from 'react';
import axios from 'axios';
import '../css/Actualite.css';
import { Link, useNavigate } from "react-router-dom";
import Chargement from './Chargement';
import ModifierPortfolio from './ModifierPortfolio';

const AjouterPortfolio = () => {
  const navigate= useNavigate();
  const [chargement, modifChargement] = useState(false);
  const [inputErrorList, setInputErrorList] = useState(false);
  const [donnees, modifdonnees] = useState({});

  const [fichier, setFichier] = useState(null);

  const handleFichierChange = (e) => {
    setFichier(e.target.files[0]);
  };
  

const recupdonnees = (e) => {
  modifdonnees({
    ...donnees,
    [e.target.name]: e.target.value,
  });
};
const enregistrer = async (e) => {
  e.preventDefault();
  modifChargement(false);
  const formData  = new FormData();
  formData.append('nomEntreprise', donnees.titre);
  formData.append('descriptionPortfolio', donnees.descriptionPortfolio);
  formData.append('lien', donnees.lien);
  formData.append('fichier', fichier);
  
  axios.post('http://127.0.0.1:8000/api/ajouterPortfolio', formData)
  .then(res=>{
        alert("Ajout effectué");
        modifChargement(false);
        navigate('/portfolio');
    }
  )
  .catch(function (error){
    if(error.response.status===422){
        setInputErrorList(error.response.data.errors)
    }
    if(error.response.status===500){
        alert(error.response.data)
        console.log(formData);
        modifChargement(false);
    }
  })
  
};
    if(chargement){
    return(
      <Chargement/>
    );
  }
  return (
    <div className="container-fluid">
      <div className="row">
      <div class="col-sm-12">
          <div class="card formulaireActualite">
            <div class="card-header">
              <h3>Ajouter un portfolio
                <Link to="/portfolio" class="btn btn-secondary float-end">Retour</Link>
              </h3>
            </div>
            <div class="card-body">
              <form onSubmit={enregistrer}>
                <div className="mb-3 mt-3">
                  <label for="titre" class="form-label">Entreprise:</label>
                  <input type="text" class="form-control" id="text" placeholder="Nom de l'entreprise" name="titre" value={donnees.titre} onChange={recupdonnees} required />
                  <span class="text-danger">{inputErrorList.name}</span>
                </div>
                <div className="mb-3 mt-3">
                  <label for="descriptionPortfolio" class="form-label">Description:</label>
                  <textarea class="form-control" rows="5" id="descriptionPortfolio" name="descriptionPortfolio" value={donnees.descriptionPortfolio} onChange={recupdonnees} required></textarea>
                  <span class="text-danger">{inputErrorList.descriptionPortfolio}</span>
                </div>
                <div className="mb-3 mt-3">
                  <label for="titre" class="form-label">Photos:</label>
                  <input type="file" class="form-control" id="text" name="photosPortfolio" value={donnees.photosPortfolio} onChange={handleFichierChange} required/>
                  <span class="text-danger">{inputErrorList.photosPortfolio}</span>
                </div>
                <div className="mb-3 mt-3">
                  <label for="lien" class="form-label">Lien:</label>
                  <input class="form-control" rows="5" id="lien" name="lien" value={donnees.lien} onChange={recupdonnees} required/>
                  <span class="text-danger">{inputErrorList.descriptionPortfolio}</span>
                </div>
                
                <button type="reset" class="btn btn-danger">Annuler</button>&nbsp;
                <button type="submit" class="btn btn-primary">Enregistrer</button>
              </form> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjouterPortfolio;
