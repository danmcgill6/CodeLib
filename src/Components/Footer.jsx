
import React from 'react';

/* -----------------    COMPONENT     ------------------ */

const Footer = () => {
    return (
        <footer className="page-footer footer">
          <div  className="container">
            <div  className="row">
              <div  className="col l6 s12">
                <h5  className="white-text">CodeLib</h5>
                <p  className="grey-text text-lighten-4">Your online code library.</p>
              </div>
              <div  className="col l4 offset-l2 s12">
                <h5  className="white-text">Links</h5>
                <ul>
                  <li><a  className="grey-text text-lighten-3" href="#!">Home</a></li>
                  <li><a  className="grey-text text-lighten-3" href="#!">Library</a></li>
                  <li><a  className="grey-text text-lighten-3" href="#!">Create</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div  className="footer-copyright">
            <div  className="container">
            © 2014 Copyright Text
            <a  className="grey-text text-lighten-4 right" href="#!">More Links</a>
            </div>
          </div>
        </footer>
    );
  }

  export default Footer
