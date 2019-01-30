import {  SET_CURRENT_USER, AUTHENTICATING_USER, FAILED_LOGIN, LOGOUT_USER} from '../reducers/types.js';

export const LoginUser=(user_name, password) =>{
	return (dispatch) => { //this comes from thunk technically we cant return a fn in action creators
    dispatch({type: AUTHENTICATING_USER})
		fetch(`http://localhost:4000/api/v1/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				user: {
					user_name: user_name,
					password: password
				}
			})
		})
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw response;
			}
		})
			.then(JSONResponse => {
				// console.log('%c INSIDE YE OLDE .THEN', 'color: navy')
				localStorage.setItem('jwt', JSONResponse.jwt)
				//localStorage is JS object to store info in user's machine so it will survive refreshing page and quitting chrome
				dispatch({ type: SET_CURRENT_USER, payload: JSONResponse.user })
        //payload info is coming from backend 
        //this.props.history.push
			})
			.catch(r => r.json().then(e => dispatch({ type: FAILED_LOGIN, payload: e.message })))
			//e.message is the error message bubbling up from Rails users_controller 
	}
}

export const fetchCurrentUser = () => {
	// takes the token in localStorage and finds out who it belongs to
	return (dispatch) => {
	dispatch({ type: AUTHENTICATING_USER }) //tells the app we are fetching
	  fetch(`http://localhost:4000/api/v1/profile`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('jwt')}`
			}
		})
		.then(response => response.json())
		  .then((JSONResponse) => dispatch({ type: SET_CURRENT_USER, payload: JSONResponse.user }))
	}
}

export function logOut(){
	localStorage.removeItem('jwt')
	return {
		type: LOGOUT_USER 
	}
}

  export const SignUpUser = (user_name, password, first_name, last_name, email, profile_picture, location, phone) => {
	return (dispatch) => {
	  const data = { user: {user_name, password, first_name, last_name, email, profile_picture, location, phone} }
	    fetch(`http://localhost:4000/api/v1/users`,{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
        body: JSON.stringify(data)
      })
      .then(res => res.json())
	    .then(res => {
		    localStorage.setItem('jwt', res.jwt)
		    dispatch({ type: SET_CURRENT_USER, payload: res.user})
	     })    
	}
  }