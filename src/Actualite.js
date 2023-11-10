import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Actualite = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/afficherActualite')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des éléments :', error);
      });
  }, []);

  return (
    <div>
      <h1>Liste des actualite</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.titre}....{item.dateEvenement}</li>
          
        ))}
      </ul>
    </div>
  );
};

export default Actualite;
