import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios'
import Collapsible from 'react-collapsible';
import register from '../registerServiceWorker';


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

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById('yourAppElement'))

export default class SubmitModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      folders:[],
      codeBlocks:[],
      selectedFolder:{},
      folderStack:[]
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
    this.renderPreviousFolder = this.renderPreviousFolder.bind(this)
  }
  componentDidMount(){

      axios.get('http://localhost:8080/api/rootFolder',{ headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }})
        .then(res => {
          let root = {}
          root.folders = res.data
          this.setState({folders:res.data, folderStack: this.state.folderStack.concat(root)})
        })
  }

  onSubmit(e){
    let title = this.props.title
    let folderId = this.state.selectedFolder.id
    let code = this.props.code
    axios.post('http://localhost:8080/api/code',{ code , folderId, title},{ headers: {
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
    let newFolderStack = this.state.folderStack.concat(folder)
    let newCodeBlocks = folder.codeBlocks
    console.log('blocks',newCodeBlocks)
    let newFolders
    folder.folders ? newFolders = folder.folders : newFolders = []
    folder.folders || folder.codeBlocks ? this.setState({ 
      folderStack: newFolderStack,
      folders: newFolders,
      codeBlocks: newCodeBlocks,
      selectedFolder: folder 
    }) : 
      this.setState({ selectedFolder: folder })
  }
  renderPreviousFolder(){
    let previousFolder = this.state.folderStack[this.state.folderStack.length -2 ]
    this.state.folderStack && this.setState({ 
      selectedFolder: previousFolder,
      folderStack: this.state.folderStack.slice(0,this.state.folderStack.length - 1),
      folders: previousFolder.folders
    }) 
  }

  render() {
    console.log(this.state)
    const folders = this.state.folders.map(folder => {
      return  <li className="collection-item" onClick={(e) => this.renderFolderContent(e,folder,folder.codeBlocks,folder.folders)} > <div>{folder.name}  <a href="#!" class="secondary-content"><i class="material-icons">send</i></a></div></li>
    }) 

    const codeBlocks = this.state.codeBlocks.map(codeBlock => {
      return <li className="collection-item" >{codeBlock.title}</li>
    })

    return ( 
      <div id='yourAppElement'>
        <button className="waves-effect waves-light btn" onClick={this.openModal}>Save Code</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
      <h2>Where would you like to save {this.props.title}</h2>
      <ul className="collection with-header">
      {this.state.folderStack.length !== 1 && <a href="#" onClick={this.renderPreviousFolder}><i className="medium material-icons left backButton">arrow_back</i></a>}
        {this.state.selectedFolder.name ?  
        <li className="collection-header"><h4>{this.state.selectedFolder.name}</h4></li>: 
         <li className="collection-header"><h4>Folders</h4></li>}
          {folders}
          {codeBlocks}
        </ul>
        <button className="waves-effect waves-light btn" onClick={this.closeModal}>close</button>
        <button className="waves-effect waves-light btn" onClick={this.onSubmit}>Save</button>
      </Modal> 
    </div> 
        
    );
  }
}