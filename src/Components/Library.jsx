import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import FolderDisplay from "./FolderDisplay";
import CodeBlockDisplay from "./CodeBlockDisplay";
import { connect } from "react-redux";
import AddFolder from "./AddFolder";

export class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFolder: {},
      folders: [],
      codeBlocks: [],
      id: null
    };
  }

  componentDidUpdate() {
    if (
      this.props.match.params.id &&
      parseInt(this.props.match.params.id) !== this.state.id
    )
      this.fetchData();
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    console.log(this.props);
    if (this.props.match.params.id) {
      axios
        .get(`http://localhost:8080/api/folders/${this.props.match.params.id}`)
        .then(res =>
          this.setState({
            folders: res.data.folders,
            codeBlocks: res.data.codeBlocks,
            selectedFolder: res.data,
            id: res.data.id
          })
        );
    } else {
      axios
        .get(
          `http://localhost:8080/api/folders/user/${this.props.currentUser.id}`
        )
        .then(res => this.setState({ folders: res.data }));
    }
  }

  render() {
   console.log('library props', this.state)
    return (
      <div className="folderContainer">
      {/* if there is no title the user is in the root directory so 
      we want to pass down isRoot prop to add folder component */}
        {this.state.selectedFolder.title ? (
          <h1>{this.state.selectedFolder.title}</h1>
        ) : (
          <div className="subHeaderContainer">
            <div className="subTitleContainer">
              <h3>Your Library</h3>
            </div>
            <div className="add-folder-container">
              <AddFolder 
                isRoot={true}
                folderId={null}
                currentUser={this.props.currentUser}
                history={this.props.history}
              />
            </div>
          </div>
        )}
        <hr />
    
          <div>
            <div className="subHeaderContainer">
              <div className="subTitleContainer">
                <h3>Code Blocks</h3>
              </div>
                  <Link
                    to={{
                      pathname: `/codeInput`,
                      state: {
                        parentFolder: this.state.selectedFolder
                      }
                    }}
                  >
                <div className="add-folder-container"> <i class="material-icons medium">add</i></div>
                  </Link>

            </div>
            <br />
            {this.state.codeBlocks.length > 0 && <CodeBlockDisplay codeBlocks={this.state.codeBlocks} />}
          </div>
        {this.state.selectedFolder.title && (
          <div className="subHeaderContainer">
            <div className="subTitleContainer">
              <h3>Folders</h3>
            </div>
            <div className="add-folder-container">
              <AddFolder 
                isRoot={false}
                folderId={this.state.selectedFolder.id}
                currentUser={this.props.currentUser}
                history={this.props.history}
              />
            </div>
          </div>
        )}
        <FolderDisplay folders={this.state.folders} history={this.props.history} />
      </div>
    );
  }
}

const mapState = state => ({ currentUser: state.currentUser });

export default connect(mapState, null)(Library);
