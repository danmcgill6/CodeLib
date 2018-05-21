import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import SubmitModal from './SubmitModal'


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

 export default class EditButton extends React.Component {
    constructor() {
        super();
        this.state = {
          modalIsOpen: false,
          title: ''
         
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
      }
      openModal() {
          this.setState({modalIsOpen: true})
          console.log('props', this.props)
        }
      afterOpenModal(){

      }
      closeModal() {
        this.setState({modalIsOpen: false});
      }

      onSubmit(e){
        axios.delete(`http://localhost:8080${this.props.apiRoute}${this.props.id}`)
      }

   render(){
    return ( 
        <div id='yourAppElement'>
        <button className="btn-floating" onClick={this.openModal}><i class="material-icons">create</i></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
        <h3>Edit </h3>
        <SubmitModal editMode={true} />
        <button className="waves-effect waves-light btn green" onClick={this.onSubmit}>YES</button>
        <button className="waves-effect waves-light btn red" onClick={this.closeModal}>NO</button>

      </Modal> 
    </div> 
    );
}
}