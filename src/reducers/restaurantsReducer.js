import { FETCHING_RESTAURANTS, FETCHED_RESTAURANTS, UNFETCH_RESTAURANTS, ADD_REVIEW, SELECT_RESTAURANT, DESELECT_RESTAURANT} from "./types";

const initialState = {
    restaurants: [],
	loadingRestaurants: false,
	addedReview: false,
	selectedRestaurant: [],
	
}

const restaurantsReducer = (state = initialState, action) => {
	//console.log('%c restaurantsReducer', 'color: pink', state, action);
	switch (action.type) {
		case FETCHING_RESTAURANTS: //tells the app we're fetching
			return { ...state, loadingRestaurants: true }
		case FETCHED_RESTAURANTS:
			return { ...state, loadingRestaurants: false, restaurants: action.payload.restaurants}
		case UNFETCH_RESTAURANTS: //tells the app we're fetching
			return { ...state, restaurants: []}
		case ADD_REVIEW:
		    //debugger
			return { ...state, loadingRestaurants: false, addedReview: true, restaurant:action.payload };
		case SELECT_RESTAURANT:
			return { ...state, selectedRestaurant: [...state.selectedRestaurant, state.restaurants.find(restaurant => restaurant.id === parseInt(action.payload))] };
		case DESELECT_RESTAURANT:
			return { ...state, selectedRestaurant:[] };
		default:
			return state
	}
}
export default restaurantsReducer;