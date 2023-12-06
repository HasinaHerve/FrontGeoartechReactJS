import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chargement from './Chargement';
import { Link, useNavigate } from "react-router-dom";

const ListePersonnel = () => {
  const navigate= useNavigate()
  const [chargement, modifChargement] = useState([true]);
  const [data, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://127.0.0.1:8000/api/afficherPersonnel');
              setData(response.data);
              modifChargement(false);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
          
      };

      fetchData();
  }, []);
  const supprimerPersonnel = (e, id)=>{
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Suppréssion...";
    axios.delete(`http://127.0.0.1:8000/api/supprimerPersonnel/${id}`)
    .then(res=>{
          alert("Suppréssion effectuée");
          modifChargement(false);
          thisClicked.closest("tr").remove();
          navigate('/Personnel');
      }
    )
    .catch(function (error){
      if(error.response.status===422){
          console.log(error.response.data.errors)
      }
      if(error.response.status===500){
          modifChargement(false);
      }
    })
  }

  if(chargement){
    return(
      <Chargement/>
    );
  }
  else{
    return (
      <>
        <table class="table">
          <thead class="table-light">
            <tr>
              <td>ID</td>
              <td>Nom</td>
              <td>Prenoms</td>
              <td>PhotoPersonnel</td>
              <td>Poste</td>
              <td>Modifier</td>
              <td>Supprimer</td>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nom}</td>
                <td>{item.prenoms}</td>
                <td><img src={"http://localhost:8000/storage/"+item.photoPersonnel} alt="Photo"/></td>
                <td>{item.poste}</td>
                <td><Link to={`/modifierPersonnel/${item.id}`} class="btn btn-secondary">Modifier</Link></td>
                <td><button type="button" onClick={(e) => supprimerPersonnel(e, item.id)} class="btn btn-danger">Suprimer</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  
};

export default ListePersonnel;
