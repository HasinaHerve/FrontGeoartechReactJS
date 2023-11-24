import React, { useState } from 'react';
import axios from 'axios';
import '../css/Actualite.css';
import { Link, useNavigate } from "react-router-dom";
import Chargement from './Chargement';

const AjouterActualite = () => {
  const navigate= useNavigate();
  const [chargement, modifChargement] = useState(false);
  const [inputErrorList, setInputErrorList] = useState(false);
  const [donnees, modifdonnees] = useState({});

  const [titre, modifTitre] = useState('');
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
  formData.append('titre', donnees.titre);
  formData.append('descriptionActualite', donnees.descriptionActualite);
  formData.append('dateEvenement', donnees.dateEvenement);
  formData.append('fichier', fichier);
  
  axios.post('http://127.0.0.1:8000/api/ajouterActualite', formData)
  .then(res=>{
        alert("Ajout effectué");
        modifChargement(false);
        navigate('/actualite');
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
              <h3>Ajouter un actualité
                <Link to="/actualite" class="btn btn-secondary float-end">Retour</Link>
              </h3>
            </div>
            <div class="card-body">
              <form onSubmit={enregistrer}>
                <div className="mb-3 mt-3">
                  <label for="titre" class="form-label">Titre:</label>
                  <input type="text" class="form-control" id="text" placeholder="Titre" name="titre" value={donnees.titre} onChange={recupdonnees} required />
                  <span class="text-danger">{inputErrorList.name}</span>
                </div>
                <div className="mb-3 mt-3">
                  <label for="descriptionActualite" class="form-label">Description:</label>
                  <textarea class="form-control" rows="5" id="descriptionActualite" name="descriptionActualite" value={donnees.descriptionActualite} onChange={recupdonnees} required></textarea>
                  <span class="text-danger">{inputErrorList.descriptionActualite}</span>
                </div>
                <div className="mb-3 mt-3">
                  <label for="dateEvenement" className="form-label">Date:</label>
                  <input type="date" class="form-control" id="dateEvenement" name="dateEvenement" value={donnees.dateEvenement} onChange={recupdonnees} required/>
                  <span class="text-danger">{inputErrorList.dateEvenement}</span>
                </div>
                <div className="mb-3 mt-3">
                  <label for="titre" class="form-label">Photos:</label>
                  <input type="file" class="form-control" id="text" name="photosActualite" value={donnees.photosActualite} onChange={handleFichierChange} required/>
                  <span class="text-danger">{inputErrorList.photosActualite}</span>
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

export default AjouterActualite;
