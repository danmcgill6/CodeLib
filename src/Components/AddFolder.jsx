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

      postRootFolder(){
        let folderId = null
        let title = this.state.title
        let isRoot = this.props.isRoot
        let userId = this.props.currentUser.id
        axios.post(`http://localhost:8080/api/folders/${this.props.currentUser.id}`,{folderId, title, isRoot, userId},{ headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }})
      }

      titleChange(title){
        this.setState({title})
      }

      onSubmit(e){
        switch(this.props.type){
            case 'rootFolder':
            this.postRootFolder()
            break
            default:
                console.log('not found')
        }
       }

   render(){
    console.log('state', this.state)
    return ( 
        <div id='yourAppElement'>
        <button className="btn-floating btn-large waves-effect waves-light green" onClick={this.openModal}><i class="material-icons">add</i></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
         <input onChange={(e) => this.titleChange(e.target.value)}  id="first_name2" type="text" className="validate" />
         <button className="waves-effect waves-light btn" onClick={this.onSubmit}>Save</button>
      </Modal> 
    </div> 
    );
}
}