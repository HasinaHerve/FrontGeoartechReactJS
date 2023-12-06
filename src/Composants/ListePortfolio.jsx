import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chargement from './Chargement';
import { Link, useNavigate } from "react-router-dom";

const ListePortfolio = () => {
  const navigate= useNavigate()
  const [chargement, modifChargement] = useState([true]);
  const [data, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://127.0.0.1:8000/api/afficherPortfolio');
              setData(response.data);
              modifChargement(false);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
          
      };

      fetchData();
  }, []);
  const supprimerPortfolio = (e, id)=>{
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Suppréssion...";
    axios.delete(`http://127.0.0.1:8000/api/supprimerPortfolio/${id}`)
    .then(res=>{
          alert("Suppréssion effectuée");
          modifChargement(false);
          thisClicked.closest("tr").remove();
          navigate('/portfolio');
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
              <td>NomEntreprise</td>
              <td>DescriptionPortfolio</td>
              <td>PhotoPortfolio</td>
              <td>Lien</td>
              <td>Modifier</td>
              <td>Supprimer</td>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nomEntreprise}</td>
                <td>{item.descriptionPortfolio}</td>
                <td><img src={"http://localhost:8000/storage/"+item.photosPortfolio} alt="Photo"/></td>
                <td>{item.lien}</td>
                <td><Link to={`/modifierPortfolio/${item.id}`} class="btn btn-secondary">Modifier</Link></td>
                <td><button type="button" onClick={(e) => supprimerPortfolio(e, item.id)} class="btn btn-danger">Suprimer</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  
};

export default ListePortfolio;
