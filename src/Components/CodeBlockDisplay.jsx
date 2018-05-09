import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'



 const CodeBlockDisplay = ({codeBlocks}) => {

     const displayedCodeBlocks = codeBlocks.map(codeBlock => 
        <Link to={`/render/${codeBlock.id}`} className="collection-item">{codeBlock.title}</Link>
    )
    return ( 
        <div className="row">
            <div class="collection">
            {
              displayedCodeBlocks
            }
          </div>
        </div>
    );
}

export default CodeBlockDisplay