import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

 const FolderDisplay = ({folders}) => {

     let displayedFolders = folders.map(folder => 
        <div className="col s12 m4">
        <div className="card white darken-1">
          <div className="card-content black-text">
            <span className="card-title">{folder.name}</span>
            <p>Created:{folder.createdAt}</p>
          </div>
          <div className="card-action">
            <a href="#">View</a>
          </div>
        </div>
      </div>
    )
    return ( 
        <div className="row">
            {
                displayedFolders
            }
        </div>
    );
}

export default FolderDisplay