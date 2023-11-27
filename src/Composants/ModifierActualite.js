import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Actualite.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import Chargement from './Chargement';

const ModifierActualite = () => {
  let {id}=useParams();
  
  const navigate= useNavigate()
  const [chargement, modifChargement] = useState(false)
  const [donnee, modifDonnee] = useState({});
  const [fichier, setFichier] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/afficherActualite/${id}`)
    .then(res=>{
          modifDonnee(res.data.actualite)
          console.log(res.data.actualite);
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
  const formData  = new FormData();
  formData.append('titre', donnee.titre);
  formData.append('descriptionActualite', donnee.descriptionActualite);
  formData.append('dateEvenement', donnee.dateEvenement);
  formData.append('fichier', fichier);
  console.log(formData);
  
  axios.put(`http://127.0.0.1:8000/api/modifierActualite/${donnee.id}`, formData)
  .then(res=>{
        alert("Modification effectuée");
        modifChargement(false);
        navigate('/actualite');
    }
  )
  .catch(function (error){
    if(error.response.status===422){
      console.log(error.response.data.errors)
    }
    if(error.response.status===500){
        alert(error.response.data)
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
      <div className="col-sm-12">
          <div className="card formulaireActualite">
            <div className="card-header">
              <h3>Modifier un actualité
                <Link to="/actualite" className="btn btn-secondary float-end">Retour</Link>
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={enregistrer}>
                <div className="mb-3 mt-3">
                  <label for="titre" className="form-label">Titre:</label>
                  <input type="text" className="form-control" id="text" placeholder="Titre" name="titre" value={donnee.titre} onChange={recupDonnee} required />
                </div>
                <div className="mb-3 mt-3">
                  <label for="descriptionActualite" class="form-label">Description:</label>
                  <textarea className="form-control" rows="5" id="descriptionActualite" name="descriptionActualite" value={donnee.descriptionActualite} onChange={recupDonnee} required></textarea>
                </div>
                <div className="mb-3 mt-3">
                  <label for="dateEvenement" className="form-label">Date:</label>
                  <input type="date" className="form-control" id="dateEvenement" name="dateEvenement" value={donnee.dateEvenement} onChange={recupDonnee} required/>
                </div>
                <div className="mb-3 mt-3">
                  <label for="photosActualite" className="form-label">Photos:</label>
                  <input type="file" className="form-control" id="text" name="photosActualite" onChange={handleFichierChange} required/>
                </div>
                <button type="reset" className="btn btn-danger">Annuler</button>&nbsp;
                <button type="submit" className="btn btn-primary">Enregistrer</button>
              </form> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifierActualite;
