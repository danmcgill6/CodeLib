import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

 const CodeBlockDisplay = ({codeBlocks}) => {

     const displayedCodeBlocks = codeBlocks.map(codeBlock => 
       <div className="code-link"><Link to={`/render/${codeBlock.id}`} className="collection-item">{codeBlock.title}</Link></div>
    )
    return ( 
        <div className="row">
            <div className="collection collection-container">
            {
              displayedCodeBlocks
            }
          </div>
        </div>
    );
}

export default CodeBlockDisplay