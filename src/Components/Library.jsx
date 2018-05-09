import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import FolderDisplay from './FolderDisplay'
import CodeBlockDisplay from './CodeBlockDisplay'
import { connect } from 'react-redux';



export class Library extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          selectedFolder:{},
          folders:[],
          codeBlocks:[],
          id: null
        }
  }
  
   componentDidUpdate(){
       if(this.props.match.params.id && parseInt(this.props.match.params.id) !== this.state.id ) this.fetchData()
   }
   componentDidMount(){
       this.fetchData()
   }
 
  fetchData(){
      console.log(this.props)
    if(this.props.match.params.id){    
        console.log('yeah dog')         
      axios.get(`http://localhost:8080/api/folders/${this.props.match.params.id}`)
       .then(res => this.setState({
           folders: res.data.folders, 
           codeBlocks:res.data.codeBlocks, 
           selectedFolder:res.data,
           id: res.data.id
          }))
    }else{
       axios.get(`http://localhost:8080/api/folders/user/${this.props.currentUser.id}`)
      .then(res => this.setState({folders:res.data}))
    }
  }

  render() {
console.log('library state', this.state)
    return ( 
        <div className="folderContainer">
        {
            this.state.selectedFolder && <h1>{this.state.selectedFolder.name}</h1> 
        }
      
        {
            this.state.codeBlocks.length > 1 && <h3>Code Blocks</h3>
        }
            <CodeBlockDisplay codeBlocks={this.state.codeBlocks} />
        {
            this.state.codeBlocks.length > 1 && <h3>Folders</h3>
        }
            <FolderDisplay folders={this.state.folders} />
        </div>
    

    );
}
}

const mapState = (state) => ({ currentUser: state.currentUser });

export default connect(mapState, null )(Library);