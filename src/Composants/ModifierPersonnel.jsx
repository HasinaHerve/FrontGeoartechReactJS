import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Actualite.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import Chargement from './Chargement';

const ModifierPersonnel = () => {
  let {id}=useParams();
  
  const navigate= useNavigate()
  const [chargement, modifChargement] = useState(false)
  const [donnee, modifDonnee] = useState({});
  const [fichier, setFichier] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/afficherPersonnel/${id}`)
    .then(res=>{
          modifDonnee(res.data.personnel)
          console.log(res.data.personnel);
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
  formData.append('id', donnee.id);
  formData.append('nom', donnee.nom);
  formData.append('prenoms', donnee.prenoms);
  formData.append('poste', donnee.poste);
  formData.append('fichier', fichier);
  
  axios.post(`http://127.0.0.1:8000/api/modifierPersonnel`, formData)
  .then(res=>{
        alert("Modification effectuée");
        modifChargement(false);
        navigate('/personnel');
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
                <h3>Modifier un personnel
                  <Link to="/personnel" class="btn btn-secondary float-end">Retour</Link>
                </h3>
              </div>
              <div class="card-body">
                <form onSubmit={enregistrer}>
                  <div className="mb-3 mt-3">
                    <label for="nom" class="form-label">Nom:</label>
                    <input type="hidden" name="id" value={donnee.id}/>
                    <input type="text" class="form-control" id="text" placeholder="Nom du personnel" name="nom" value={donnee.nom} onChange={recupDonnee} required />
                  </div>
                  <div className="mb-3 mt-3">
                    <label for="prenoms" class="form-label">Prenoms:</label>
                    <input class="form-control" rows="5" id="prenoms" name="prenoms" value={donnee.prenoms} onChange={recupDonnee} required/>
                  </div>
                  <div className="mb-3 mt-3">
                    <label for="photosPersonnel" class="form-label">Photo:</label>
                    <input type="file" class="form-control" id="text" name="photosPersonnel" onChange={handleFichierChange} required/>
                  </div>
                  <div className="mb-3 mt-3">
                    <label for="poste" class="form-label">Poste:</label>
                    <input class="form-control" rows="5" id="lien" name="poste" value={donnee.poste} onChange={recupDonnee} required/>
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

export default ModifierPersonnel;
