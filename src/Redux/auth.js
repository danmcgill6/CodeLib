import axios from 'axios';

/* -----------------    ACTION TYPES    ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

/* ------------     ACTION CREATORS      ------------------ */

const setCurrentUser  = user => ({ type: SET_CURRENT_USER, user });
const removeCurrentUser  = () => ({ type: REMOVE_CURRENT_USER });

/* ------------          REDUCER         ------------------ */

export default function reducer (currentUser = {}, action) {
  switch (action.type) {

    case SET_CURRENT_USER:
      return action.user;

    case REMOVE_CURRENT_USER:
    	return {};

    default:
      return currentUser;
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const login = (credentials, history) => dispatch => {
  axios.post('http://localhost:8080/auth/login', credentials, {withCredentials: true})
    .then(res => setUserAndRedirect(res.data, history, dispatch))
    .catch(err => console.error(`Logging in with ${credentials.email} and ${credentials.password} was unsuccesful`, err));
};
export const logout = history => dispatch => {
  axios.post('http://localhost:8080/auth/logout')
    .then(res => dispatch(removeCurrentUser(res.data)))
    .catch(err => console.error('Logging out was unsuccesful', err));
};

export const persistUser = user => dispatch => {
   setUserAndRedirect(user,[],dispatch)
};

export const signup = (credentials,history) => dispatch => {
  axios.post('http://localhost:8080/auth/signup', credentials)
    .then(res => setUserAndRedirect(res.data, history, dispatch))
    .catch(err => console.error(`Signing up with ${credentials.email} and ${credentials.password} was unsuccesful`, err));
};

export const fetchCurrentUser = () => dispatch => {
  axios.get('http://localhost:8080/auth/me')
    .then(res =>{
      dispatch(setCurrentUser(res.data))
    })
    .catch(err => console.error('Fetching current user failed', err));
};

/* ------------      HELPER FUNCTIONS     ------------------ */

function setUserAndRedirect (user, history, dispatch) {
  dispatch(setCurrentUser(user));
  history.push(`/`)
}