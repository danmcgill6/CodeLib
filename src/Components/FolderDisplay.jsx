import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Link } from 'react-router-dom'
import DeleteButton from './DeleteButton'

 const FolderDisplay = ({folders}) => {
     console.log(folders)

     let displayedFolders = folders.map(folder => 
        <div className="col s12 m4">
        <div className="card white darken-1">
          <div className="card-content black-text">
            <span className="card-title">{folder.title}</span>
            <p>Created: {folder.createdAt.slice(0,10)}</p>
          </div>
          <div className="card-action">
          <div id="folderLink">
            <Link to={`/library/${folder.id}`}>View</Link>
          </div>
          <div id="folderDelete">
             <DeleteButton item={folder.title}/>
          </div>
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