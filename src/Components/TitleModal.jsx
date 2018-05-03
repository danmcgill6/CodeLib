import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios'
import Collapsible from 'react-collapsible';
import register from '../registerServiceWorker';
import SubmitModal from './SubmitModal'


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

export default class TitleModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
        title:''
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {this.setState({modalIsOpen: true});}
  afterOpenModal(){}

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  titleChange(title){
    this.setState({title})
  }

  render() {

    return ( 
      <div id='yourAppElement'>
              <button className="waves-effect waves-light btn" onClick={this.openModal}>hbhlhl</button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
      <h2>Enter Title of CodeBlock</h2>
      <div className="row">
    <form className="col s12">
      <div className="row">
        <div className="input-field col s6">
          <i className="material-icons prefix">mode_edit</i>
          <textarea onChange={(e) => this.titleChange(e.target.value)}id="icon_prefix2" className="materialize-textarea"></textarea>
          <label for="icon_prefix2">Title</label>
        </div>
      </div>
    </form>
  </div>
        <SubmitModal title={this.state.title} code={this.props.code}/>
      </Modal> 
    </div> 

);
}
}