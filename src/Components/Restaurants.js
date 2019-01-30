import React, { Component } from 'react'
import '../App.css';
import { connect } from "react-redux";
import { fetchRestaurants } from '../actions/action'
import RestaurantProfile from './RestaurantProfile'


class Restaurants extends Component {

  constructor(props){
    super(props);
    this.state = {
      restaurantId : ""
    }
  }

  componentDidMount() {
    this.props.fetchRestaurants()
  }

  handleOpen = (event) => {
    //console.log(event.target.id)
    this.setState({ restaurantId: event.target.id})
  };

  handleClear = () => {
    this.setState({ restaurantId: ""})
  }

  renderRestaurants = () => {
    return this.props.restaurants.map(restaurant => (
      <div onClick={this.handleOpen} key={restaurant.id} id={restaurant.id} >{restaurant.name}</div>
    )

    )
  }

  render() {
     //console.log("what is props.restaurants", this.props.restaurants)
    return this.state.restaurantId ? <RestaurantProfile handleClear={this.handleClear} reviews={this.props.reviews} user={this.props.user} restaurant={this.props.restaurants[this.state.restaurantId-1]}/> : <div>{this.renderRestaurants()}</div>

  }
}
const mapStateToProps = (state) => {
  console.log("inside restaurants what is state", state.restaurants)
   return{
      restaurants: state.restaurants.restaurants,
      user: state.user.user,
      reviews: state.restaurants.restaurants.reviews
   }
 }

 const mapDispatchToProps = (dispatch) => {
  //console.log("inside profile", dispatch)
  
  return{
    fetchRestaurants:()=> dispatch(fetchRestaurants()),
  }
}

 export default connect(mapStateToProps, mapDispatchToProps)(Restaurants)