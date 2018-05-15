import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios'
import Collapsible from 'react-collapsible';
import register from '../registerServiceWorker';
import SubmitModal from './SubmitModal'
import { connect } from 'react-redux';


const customStyles = {
    overlay:{
    zIndex:100,
    backgroundColor: "rgba(255, 255, 255, 0.75)"
     },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('yourAppElement'))

export class TitleModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
        title:''
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }

  openModal() {this.setState({modalIsOpen: true});}
  afterOpenModal(){}

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  titleChange(title){
    this.setState({title})
  }

  onSubmit(){
    let title = this.state.title
    let code = this.props.code
    let folderId = this.props.selectedFolder.id 
    axios.post(`http://localhost:8080/api/code/${this.props.currentUser.id}`,{ code , folderId, title},{ headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  }})
    .then(res => this.props.history.push('/'))
  }

  render() {
    console.log(this.props)

    return ( 
      <div id='yourAppElement' className ='modalContainer'>
              <button className="btn waves-effect waves-light saveButton" onClick={this.openModal}>Save CodeBlock</button>
    <div className="saveButton">
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
      <h2>Please give your CodeBlock a title</h2>
      <div className="row">
    <div className="input-field col s6">
    <i className="material-icons prefix">mode_edit</i>
      <input onChange={(e) => this.titleChange(e.target.value)}  id="first_name2" type="text" className="validate" />
      <label className="active" for="first_name2">Title</label>
    </div>
  </div>
       { 
      this.props.selectedFolder ?  
      <button className="waves-effect waves-light btn" onClick={this.onSubmit}>Save Code to {this.props.selectedFolder.title}</button> 
      :
       <SubmitModal title={this.state.title} code={this.props.code} />
       }
      </Modal> 
      </div>
    </div> 

);
}
}


const mapState = (state) => ({ currentUser: state.currentUser });

export default connect(mapState, null )(TitleModal);