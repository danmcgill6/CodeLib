import React from 'react';
import { connect } from 'react-redux';
import { login } from '../Redux/auth';

/* -----------------    COMPONENT     ------------------ */

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onLoginSubmit.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this)
  }

  render() {
    const { message } = this.props;
    return (
        <div className="row">
    <form className="col s8" onSubmit={this.onLoginSubmit}>
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

  onLoginSubmit(event) {
    event.preventDefault();
    this.props.login({
      email: event.target.email.value,
      password: event.target.password.value,
    })
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = () => ({ message: 'Sign up' });

const mapDispatch = (dispatch, ownProps) => (
  {
    login: credentials => {
      dispatch(login(credentials, ownProps.history));
    }
  })

export default connect(mapState, mapDispatch)(Login);