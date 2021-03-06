import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import axios from "axios";
import Collapsible from "react-collapsible";
import register from "../registerServiceWorker";
import { connect } from "react-redux";

const customStyles = {
  overlay: {
    zIndex: 100,
    backgroundColor: "rgba(255, 255, 255, 0.75)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement(document.getElementById("yourAppElement"));

export class SubmitModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      folders: [],
      codeBlocks: [],
      selectedFolder: {},
      folderStack: [],
      loadedRoot: false,
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderPreviousFolder = this.renderPreviousFolder.bind(this);
  }
  componentDidMount() {
    axios
      .get(
        `http://localhost:8080/api/folders/user/${this.props.currentUser.id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res);
        let root = {};
        root.folders = res.data;
        this.setState({
          loadedRoot: true,
          folders: res.data,
          folderStack: this.state.folderStack.concat(root)
        });
      });
  }

  onSubmit(e) {
    let title = this.props.title;
    let code = this.props.code;
    let folderId = this.state.selectedFolder.id;
    if(!this.props.editMode){
    axios
      .post(
        `http://localhost:8080/api/code/${this.props.currentUser.id}`,
        { code, folderId, title },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
      .then(_ => this.props.history.push('/library'));
  }else{
    if(this.props.folderId === this.state.selectedFolder.folderId){
      axios.put(`http://localhost:8080/api/folders/${this.props.folderId}`,
      { folderId, isRoot:false  },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log('yo')
          axios.put(`http://localhost:8080/api/folders/${this.state.selectedFolder.id}`,
          { folderId: null , isRoot:true  },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          })
        })
        .then(_ => this.props.history.push('/library'))
    }else{
      axios.put(`http://localhost:8080/api/folders/${this.props.folderId}`,
      { folderId, isRoot:false  },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(_ => this.props.history.push('/library'))
    }
  }
}



  openModal() {
    this.setState({ modalIsOpen: true });
  }
  afterOpenModal() {}

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  renderFolderContent(e, folder, codeBlocks, folders) {
    let newFolderStack = this.state.folderStack.concat(folder);
    let newCodeBlocks;
    let newFolders;
    console.log(folder);
    folder.folders ? (newFolders = folder.folders) : (newFolders = []);
    folder.codeBlocks
      ? (newCodeBlocks = folder.codeBlocks)
      : (newCodeBlocks = []);
    this.setState({
      folderStack: newFolderStack,
      folders: newFolders,
      codeBlocks: newCodeBlocks,
      selectedFolder: folder
    });
  }
  renderPreviousFolder() {
      // set the previous folder to be the one behind the current folder,
      //which is the last folder in the array , so its .length -2
      let previousFolder = this.state.folderStack[
        this.state.folderStack.length - 2
      ];
      //declare variable with no values because values are conditional
      let newCodeBlocks;
      let newFolders;
      //if previous folder has child folders, set content else , set it to empty arr
      previousFolder.folders
        ? (newFolders = previousFolder.folders)
        : (newFolders = []);
      //if previous folder has child codeblocks, set content else , set it to empty arr
      previousFolder.codeBlocks
        ? (newCodeBlocks = previousFolder.codeBlocks)
        : (newCodeBlocks = []);
      //currently unsure why we need this conditional but ont want to touch code right now
      this.state.folderStack &&
        //set state to include previous folder and it content, also update the folder stack
        this.setState({
          selectedFolder: previousFolder,
          folderStack: this.state.folderStack.slice(
            0,
            this.state.folderStack.length - 1
          ),
          folders: previousFolder.folders,
          codeBlocks: newCodeBlocks
        });
   
  }

  render() {
    console.log('PROPS',  this.props);
    //variable folders holds all of the current rendered folders as list items , which
    //when clicked call renderfolder content, rendering the apropriat content
    const folders = this.state.folders.map(folder => {
      return (
        <li
          className="collection-item"
          onClick={e =>
            this.renderFolderContent(
              e,
              folder,
              folder.codeBlocks,
              folder.folders
            )
          }
        >
          <div>
            {folder.title}
            <a href="#!" class="secondary-content">
              <i class="material-icons">send</i>
            </a>
          </div>
        </li>
      );
    });
    //codeblocks holds  all the current codeblocks being rendered, this is more for show.
    const codeBlocks = this.state.codeBlocks.map(codeBlock => {
      return <li className="collection-item">{codeBlock.title}</li>;
    });

    return (
      //div for modal
      <div id="yourAppElement">
      {/* element that is displaying this component */}
      {
        this.props.editMode ?
        <i className="material-icons icon-button" onClick={this.openModal}>folder</i>
          :
          <button
            className="waves-effect waves-light btn"
            onClick={this.openModal}
          >
            Save Code
          </button>
        

      }
        {/* start of modal */}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <h2>Where would you like to save {this.props.title}</h2>
          <ul className="collection with-header">
          {/* if the folderstack is not equal to one that means we are not at the 
          root and can continue climbing back our folder stack*/}
            {this.state.folderStack.length !== 1 && (
              <a href="#" onClick={this.renderPreviousFolder}>
                <i className="medium material-icons left backButton">
                  arrow_back
                </i>
              </a>
            )}
            {/* conditional rendering for folder title defaults to folders if no folder is selected*/}
            {this.state.selectedFolder.title ? (
              <li className="collection-header">
                <h4>{this.state.selectedFolder.title}</h4>
              </li>
            ) : (
              <li className="collection-header">
                <h4>Folders</h4>
              </li>
            )}
            {folders}
            {codeBlocks}
          </ul>
          <button className="waves-effect waves-light btn" onClick={this.closeModal}>
            close
          </button>
          <button className="waves-effect waves-light btn" onClick={this.onSubmit}>
            Save
          </button>
        </Modal>
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({ currentUser: state.currentUser, ownProps });

export default connect(mapState, null)(SubmitModal);
