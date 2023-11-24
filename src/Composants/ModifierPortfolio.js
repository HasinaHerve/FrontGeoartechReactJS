import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Actualite.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import Chargement from './Chargement';

const ModifierPortfolio = () => {
  let {id}=useParams();
  
  const navigate= useNavigate()
  const [chargement, modifChargement] = useState(false)
  const [donnee, modifDonnee] = useState({});
  const [fichier, setFichier] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/afficherPortfolio/${id}`)
    .then(res=>{
          modifDonnee(res.data.portfolio)
          console.log(res.data.portfolio);
          modifChargement(false);
      });
  }, [id])

  const handleFichierChange = (e) => {
    setFichier(e.target.files[0]);
  };

const recupDonnee = (e) => {
  modifDonnee({
    ...donnee,
    [e.target.name]: e.target.value,
  });
};
const enregistrer = async (e) => {
  e.preventDefault();
  modifChargement(false);
  const formData = {
    nomEntreprise: donnee.nomEntreprise,
    descriptionPortfolio: donnee.descriptionPortfolio, 
    lien: donnee.lien,
    fichier: fichier, 
  };
  
  axios.put(`http://127.0.0.1:8000/api/modifierPortfolio/${donnee.id}`, formData)
  .then(res=>{
        alert("Modification effectuée");
        modifChargement(false);
        navigate('/portfolio');
    }
  )
  .catch(function (error){
    if(error.response.status===422){
      console.log(error.response.data.errors)
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
              <h3>Modifier un portfolio
                <Link to="/portfolio" class="btn btn-secondary float-end">Retour</Link>
              </h3>
            </div>
            <div class="card-body">
              <form onSubmit={enregistrer}>
                <div className="mb-3 mt-3">
                  <label for="nomEntreprise" class="form-label">Entreprise:</label>
                  <input type="text" class="form-control" id="text" placeholder="Nom de l'entreprise" name="nomEntreprise" value={donnee.nomEntreprise} onChange={recupDonnee} required />
                </div>
                <div className="mb-3 mt-3">
                  <label for="descriptionPortfolio" class="form-label">Description:</label>
                  <textarea class="form-control" rows="5" id="descriptionPortfolio" name="descriptionPortfolio" value={donnee.descriptionPortfolio} onChange={recupDonnee} required></textarea>
                </div>
                <div className="mb-3 mt-3">
                  <label for="titre" class="form-label">Photos:</label>
                  <input type="file" class="form-control" id="text" name="photosPortfolio" onChange={handleFichierChange} required/>
                </div>
                <div className="mb-3 mt-3">
                  <label for="lien" class="form-label">Lien:</label>
                  <input class="form-control" rows="5" id="lien" name="lien" value={donnee.lien} onChange={recupDonnee} required/>
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

export default ModifierPortfolio;
