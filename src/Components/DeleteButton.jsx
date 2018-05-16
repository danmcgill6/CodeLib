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

 export default class DeleteButton extends React.Component {
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
        
      }

   render(){
    return ( 
        <div id='yourAppElement'>
        <button className="btn-floating" onClick={this.openModal}><i class="material-icons">delete</i></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
        <h3>Are you sure you want to delete {this.props.item} ?</h3>
        <button className="waves-effect waves-light btn green" onClick={this.openModal}>YES</button>
        <button className="waves-effect waves-light btn red" onClick={this.closeModal}>NO</button>

      </Modal> 
    </div> 
    );
}
}