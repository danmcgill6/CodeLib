import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import FolderDisplay from './FolderDisplay'

export default class Library extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          slectedFolderd:{},
          folders:[],
          codeBlocks:[]
        }
  }
  componentDidMount(){
      if(this.props.match.params.id){    
          console.log('yeah dog')         
        axios.get(`http://localhost:8080/api/folders/${this.props.match.params.id}`)
         .then(res => this.setState({folders: res.data.folders, codeBlocks:res.data.codeBlocks}))
      }else{
        axios.get('http://localhost:8080/api/folders')
        .then(res => this.setState({folders:res.data}))
      }
       

  }

  render() {

    return ( 
        <div className="folderContainer">
            <FolderDisplay folders={this.state.folders} />
        </div>

    );
}
}