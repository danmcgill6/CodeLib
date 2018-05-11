import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';


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
      transform             : 'translate(-50%, -50%)'
    }
  };

 export default class AddFolder extends React.Component {
    constructor() {
        super();
        this.state = {
          modalIsOpen: false,
         
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
      }
      openModal() {
          this.setState({modalIsOpen: true})
        }
      afterOpenModal(){

      }
      closeModal() {
        this.setState({modalIsOpen: false});
      }

      onSubmit(e){
        let title = this.props.title
        let code = this.props.code
        let folderId = this.state.selectedFolder.id
        axios.post(`http://localhost:8080/api/code/${this.props.currentUser.id}`,{ code , folderId, title},{ headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }})
        .then(res => console.log(res))
    }
   render(){

    return ( 
        <div id='yourAppElement'>
        <button className="btn-floating btn-large waves-effect waves-light green" onClick={this.openModal}><i class="material-icons">add</i></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
      <h2>Input Folder name</h2>
      </Modal> 
    </div> 
    );
}
}