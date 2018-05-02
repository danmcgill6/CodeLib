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
      modalIsOpen: false,
      folders:[],
      codeBlocks:[],
      selectedFolder:{}
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }
  componentDidMount(){

      axios.get('http://localhost:8080/api/rootFolder',{ headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
        .then(res => this.setState({folders:res.data}))
  }

  onSubmit(e){
    let code = this.props.code
    axios.post('http://localhost:8080/api/code',{ code , folderId: this.state.selectedFolder.id},{ headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  }})
    .then(res => console.log(res))
}

  openModal() {this.setState({modalIsOpen: true});}
  afterOpenModal(){}

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  renderFolderContent(e,folder,codeBlocks,folders){
    folder.folders ? this.setState({ folders, selectedFolder:folder }) : this.setState({ selectedFolder:folder })
  }

  render() {
    const folders = this.state.folders.map(folder => {
      return  <li onClick={(e) => this.renderFolderContent(e,folder,folder.codeBlocks,folder.folders)} >{folder.name}</li>
    }) 
    console.log(this.state.selectedFolder)
    return ( 
      <div id='yourAppElement'>
        <button onClick={this.openModal}>Save Code</button>
         <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
      <h2>Where would you like to save this file</h2>
        <ul>
          {
            folders
          }
        </ul>
        <button onClick={this.closeModal}>close</button>
        <button onClick={this.onSubmit}>Save</button>
      </Modal> 
    </div> 
        
    );
  }
}