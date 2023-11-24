import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Actualite.css';
import DataTable from 'react-data-table-component';
import ListePersonnel from './ListePersonnel';
import { Link } from "react-router-dom";

const Personnel = () => {
    return(
      <div className="container-fluid">
        <div className="row">
          <div class="col-sm-12 mb-3 mb-sm-0">
            <div class="card listeActualite">
              <div class="card-header">
                <h3>Liste des personnels
                  <Link to="/ajouterPersonnel" class="btn btn-primary float-end">Ajouter</Link>
                </h3>
              </div>
              <div class="card-body">
                <ListePersonnel/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Personnel;