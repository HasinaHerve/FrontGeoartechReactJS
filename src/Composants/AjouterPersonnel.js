import React, { useState } from 'react';
import axios from 'axios';
import '../css/Actualite.css';
import { Link, useNavigate } from "react-router-dom";
import Chargement from './Chargement';
import ModifierPersonnel from './ModifierPersonnel';

const AjouterPersonnel = () => {
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
  formData.append('nom', donnees.nom);
  formData.append('prenoms', donnees.prenoms);
  formData.append('poste', donnees.poste);
  formData.append('fichier', fichier);
  
  axios.post('http://127.0.0.1:8000/api/ajouterPersonnel', formData)
  .then(res=>{
        alert("Ajout effectué");
        modifChargement(false);
        navigate('/Personnel');
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
                <h3>Ajouter un personnel
                  <Link to="/personnel" class="btn btn-secondary float-end">Retour</Link>
                </h3>
              </div>
              <div class="card-body">
                <form onSubmit={enregistrer}>
                  <div className="mb-3 mt-3">
                    <label for="nom" class="form-label">Nom:</label>
                    <input type="text" class="form-control" id="text" placeholder="Nom du personnel" name="nom" value={donnees.nom} onChange={recupdonnees} required />
                  </div>
                  <div className="mb-3 mt-3">
                    <label for="prenoms" class="form-label">Prenoms:</label>
                    <input class="form-control" rows="5" id="prenoms" name="prenoms" value={donnees.prenoms} onChange={recupdonnees} required/>
                  </div>
                  <div className="mb-3 mt-3">
                    <label for="photosPersonnel" class="form-label">Photo:</label>
                    <input type="file" class="form-control" id="text" name="photosPersonnel" value={donnees.photosPersonnel} onChange={handleFichierChange} required/>
                  </div>
                  <div className="mb-3 mt-3">
                    <label for="poste" class="form-label">Poste:</label>
                    <input class="form-control" rows="5" id="lien" name="poste" value={donnees.poste} onChange={recupdonnees} required/>
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

export default AjouterPersonnel;
