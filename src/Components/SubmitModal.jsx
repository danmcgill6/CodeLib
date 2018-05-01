// import React from 'react';
// // import ReactDOM from 'react-dom';
// import Modal from 'react-modal';
// import axios from 'axios'
// import Collapsible from 'react-collapsible';
// import register from '../registerServiceWorker';


// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };

// // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement(document.getElementById('yourAppElement'))

// export default class SubmitModal extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       modalIsOpen: false,
//       folders:[]
//     };

//     this.openModal = this.openModal.bind(this);
//     this.afterOpenModal = this.afterOpenModal.bind(this);
//     this.closeModal = this.closeModal.bind(this);
//   }
//   componentDidMount(){
//     console.log(document.querySelector('.dropdown-trigger'))
//       axios.get('http://localhost:8080/api/rootFolder',{ headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }})
//         .then(res => this.setState({folders:res.data}))
//   }

//   openModal() {
//     this.setState({modalIsOpen: true});
//   }

//   afterOpenModal(){

//   }

//   closeModal() {
//     this.setState({modalIsOpen: false});
//   }

//   render() {
//     // $('.dropdown-trigger').dropdown();

//     console.log('state', this.state)
//     const roots = this.state.folders.map(folder =>  <Collapsible onClick={this.renderFolderContent}trigger={folder.name}></Collapsible>)
//     return ( 
//       <div id='yourAppElement'>
//         <button onClick={this.openModal}>Open Modal</button>
//         <Modal
//           isOpen={this.state.modalIsOpen}
//           onAfterOpen={this.afterOpenModal}
//           onRequestClose={this.closeModal}
//           style={customStyles}
//           contentLabel="Example Modal"
//         >

//           <h2>Choose a folder</h2>
       
//           {
//             roots
//           }
//             <a className='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a>

      
//           <ul id='dropdown1' className='dropdown-content'>
//             <li><a href="#!">one</a></li>
//             <li><a href="#!">two</a></li>
//             <li class="divider" tabindex="-1"></li>
//             <li><a href="#!">three</a></li>
//             <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
//             <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
//           </ul>
//           <button onClick={this.closeModal}>close</button>
//         </Modal>
//       </div>
//     );
//   }
// }