import React, { Component } from 'react'
import '../App.css';
import { connect } from "react-redux";
import { fetchRestaurants } from '../actions/action'


class Restaurants extends Component {

  componentDidMount() {
    this.props.fetchRestaurants()
  }

  renderRestaurants = () => {
    return this.props.restaurants.map(restaurant => (
      <div>{restaurant.name}</div>
    )

    )
  }

  render() {
     console.log("what is props.restaurants", this.props.restaurants)
    return (
     <div>
         {this.renderRestaurants()}
     </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log("inside restaurants what is state", state)
   return{
      restaurants: state.restaurants.restaurants
   }
 }

 const mapDispatchToProps = (dispatch) => {
  //console.log("inside profile", dispatch)
  
  return{
    fetchRestaurants:()=> dispatch(fetchRestaurants()),
  }
}

 export default connect(mapStateToProps, mapDispatchToProps)(Restaurants)