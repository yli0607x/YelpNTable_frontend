import { FETCHING_RESTAURANTS, FETCHED_RESTAURANTS } from '../reducers/types.js';

export const fetchRestaurants = () => {
    
	// takes the token in localStorage and finds out who it belongs to
	return (dispatch) => {
	dispatch({ type: FETCHING_RESTAURANTS }) //tells the app we are fetching
        fetch("http://localhost:4000/api/v1/restaurants", {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
        }) 
        .then(r => r.json())
        .then((data) => dispatch({ type: FETCHED_RESTAURANTS, payload: {restaurants: data} }))	
	}
}