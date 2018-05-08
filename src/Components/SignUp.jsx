import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../Redux/auth';

/* -----------------    COMPONENT     ------------------ */

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
  }

  render() {
    const { message } = this.props;
    return (
        <div className="row">
    <form className="col s8" onSubmit={this.onSignupSubmit}>
      <div className="row">
        <div className="input-field col s6">
          <input
           placeholder="First Name" 
           id="first_name" 
           type="text" 
           class="validate" 
           name="firstName" 
           required
           />
        </div>
        <div className="input-field col s6">
          <input
           placeholder="Last Name" 
            id="last_name"
            type="text" 
            class="validate" 
            name="lastName"
            required
            />
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input 
          placeholder="Email" 
          id="email"
           type="email" 
           class="validate" 
           name="email"
           required
           />
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input 
          placeholder="Password"
           id="password"
           type="password"
           class="validate" 
           name="password"
           required/>
        </div>
      </div>
      <div className="row">
      </div>
      <button type="submit" className="btn btn-block btn-primary">{message}</button>
    </form>
  </div>
    );
  }

  onSignupSubmit(event) {
    event.preventDefault();
    this.props.signup({
      email: event.target.email.value,
      password: event.target.password.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value
    })
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' });

const mapDispatch = (dispatch, ownProps) => (
  {
    signup: credentials => {
      dispatch(signup(credentials, ownProps.history));
    }
  })

export default connect(mapState, mapDispatch)(Signup);