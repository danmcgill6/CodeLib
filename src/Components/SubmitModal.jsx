import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios'
import Collapsible from 'react-collapsible';
import register from '../registerServiceWorker';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('yourAppElement'))

export default class SubmitModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount(){
      axios.get('http://localhost:8080/api/rootFolder',{ headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
        .then(res => console.log(res))
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div id='yourAppElement'>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2>Choose a folder</h2>
       
          <Collapsible trigger="Start here">
                <p>This is the collapsible content. It can be any element or React component you like.</p>
                <p>It can even be another Collapsible component. Check out the next section!</p>
          </Collapsible>
          <Collapsible trigger="Start here">
                <p>This is the collapsible content. It can be any element or React component you like.</p>
                <p>It can even be another Collapsible component. Check out the next section!</p>
          </Collapsible>
          <Collapsible trigger="Start here">
                <p>This is the collapsible content. It can be any element or React component you like.</p>
                <p>It can even be another Collapsible component. Check out the next section!</p>
          </Collapsible>
          <button onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}