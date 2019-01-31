import React, { Component } from 'react'
import '../App.css';
import { connect } from "react-redux";
import { fetchRestaurants, selectThisRestaurant } from '../actions/action'
import RestaurantProfile from './RestaurantProfile'
import NavBar from './NavBar'
import { Redirect } from "react-router-dom";


class Restaurants extends Component {

  constructor(props){
    super(props);
    this.state = {
      restaurantId : "",
      restaurants: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:4000/api/v1/restaurants", {
      method: 'GET',
      headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      }
    }) 
    .then(r => r.json())
    .then((data) => this.setState({restaurants: data}))	
  }

  handleOpen = (event) => {
    //console.log(event.target.id)
    this.setState({restaurantId: event.target.id})
  };

  handleClear = () => {
    this.setState({ restaurantId: ""})
  }

  renderRestaurants = () => {
    return this.state.restaurants.map(restaurant => (
      <div onClick={this.handleOpen} key={restaurant.id} id={restaurant.id} >{restaurant.name}</div>
    )

    )
  }

  render() {
     //console.log("what is props.restaurants", this.props.restaurants)
    return this.props.isLoggedIn === true ? this.state.restaurantId ? 
    <div>
    <NavBar handleClear={this.handleClear}/>
    <RestaurantProfile handleClear={this.handleClear} user={this.props.user} id={this.state.restaurantId} restaurant={this.state.restaurants[this.state.restaurantId-1]}/> 
    </div>
    : 
    <div>
    <NavBar />
    {this.renderRestaurants()}
    </div> : <Redirect to="/login" />


  }
}
const mapStateToProps = (state) => {
  console.log("inside restaurants what is state", state)
   return{
      user: state.user.user,
      isLoggedIn: state.user.isLoggedIn,
   }
 }

//  const mapDispatchToProps = (dispatch) => {
//   //console.log("inside profile", dispatch)
  
//   return{
//     fetchRestaurants:()=> dispatch(fetchRestaurants()),
//     selectThisRestaurant: id => dispatch(selectThisRestaurant(id)), 
//   }
// }

 export default connect(mapStateToProps)(Restaurants)