import React from 'react';
import ReactDOM from 'react-dom';


 const CodeBlockDisplay = ({codeBlocks}) => {
     const displayedCodeBlocks = codeBlocks.map(codeBlock => 
        <a href="#!" className="collection-item">{codeBlock.title}</a>
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