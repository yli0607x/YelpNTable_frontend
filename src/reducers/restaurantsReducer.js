import { FETCHING_RESTAURANTS, FETCHED_RESTAURANTS, UNFETCH_RESTAURANTS, ADD_REVIEW} from "./types";

const initialState = {
    restaurants: [],
	loadingRestaurants: false,
	addedReview: false,
	
}

const restaurantsReducer = (state = initialState, action) => {
	console.log('%c restaurantsReducer', 'color: pink', state, action);
	switch (action.type) {
		case FETCHING_RESTAURANTS: //tells the app we're fetching
			return { ...state, loadingRestaurants: true }
		case FETCHED_RESTAURANTS:
			return { ...state, loadingRestaurants: false, restaurants: action.payload.restaurants}
		case UNFETCH_RESTAURANTS: //tells the app we're fetching
			return { ...state, restaurants: []}
		case ADD_REVIEW:
			return { ...state, loadingRestaurants: false, addedReview: true };
		default:
			return state
	}
}
export default restaurantsReducer;