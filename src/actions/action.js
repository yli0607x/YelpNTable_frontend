import { FETCHING_RESTAURANTS, FETCHED_RESTAURANTS, ADD_REVIEW } from '../reducers/types.js';

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

export const addReview = (restaurant_id, user_id, title, comment, star) => {
  return (dispatch) => {
    dispatch({ type: FETCHING_RESTAURANTS }) //tells the app we are fetching
      fetch(`http://localhost:4000/api/v1/restaurants/${restaurant_id}/reviews`, {
        method: 'POST',
        headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurant_id: restaurant_id,
          user_id: user_id,
          title: title,
          comment: comment, 
          star: star
        })
      }) 
      .then(r => r.json())
      .then((data) => dispatch({ type: ADD_REVIEW, payload: {review: data} }))	
  }
}

// export function addItem(name, image, catId, userId) {
//     return (dispatch) => {
//         dispatch(
//             { type: FETCHING_CLOSET }
//             )
//         return axios({
//             method: "post",
//             baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${userId}/items`,
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//                 "Access-Control-Allow-Origin": "*"
//             },
//             data: {
//                 item: {
//                     name: name,
//                     image: image,
//                     category_id: catId,
//                     user_id: userId
//                 }
//             }
//         })
//             .then(r => {
//                 if (r.statusText === "Created") {
                    
//                     dispatch({ type: ADD_ITEM, payload: r.data });
//                 }
//             })

//     }
// }