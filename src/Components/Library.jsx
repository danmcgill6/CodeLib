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
      console.log("yeah dog");
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
    console.log("library state", this.state);
    return (
      <div className="folderContainer">
        {this.state.selectedFolder.title ? (
          <h1>{this.state.selectedFolder.title}</h1>
        ) : (
          <div className="subHeaderContainer">
            <div className="subTitleContainer">
              <h3>YourLibrary</h3>
            </div>
            <div className="addButtonContainer">
              <AddFolder 
                isRoot={true}
                folderId={null}
                currentUser={this.props.currentUser}
              />
            </div>
          </div>
        )}
        <hr />
        {this.state.codeBlocks.length > 1 && (
          <div>
            <div className="subHeaderContainer">
              <div className="subTitleContainer">
                <h3>Code Blocks</h3>
              </div>
              <div className="addButtonContainer">
                <button className="btn-floating btn-large waves-effect waves-light green">
                  <Link
                    to={{
                      pathname: `/codeInput`,
                      state: {
                        parentFolder: this.state.selectedFolder
                      }
                    }}
                  >
                    <i class="material-icons">add</i>
                  </Link>{" "}
                </button>
              </div>
            </div>
            <br />
            <CodeBlockDisplay codeBlocks={this.state.codeBlocks} />
          </div>
        )}
        {this.state.codeBlocks.length > 1 && (
          <div className="subHeaderContainer">
            <div className="subTitleContainer">
              <h3>Folders</h3>
            </div>
            <div className="addButtonContainer">
              <AddFolder 
                isRoot={false}
                folderId={this.state.selectedFolder.id}
                currentUser={this.props.currentUser}
              />
            </div>
          </div>
        )}
        <FolderDisplay folders={this.state.folders} />
      </div>
    );
  }
}

const mapState = state => ({ currentUser: state.currentUser });

export default connect(mapState, null)(Library);
