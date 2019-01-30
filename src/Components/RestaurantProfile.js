import React, { Component } from 'react'
import '../App.css';

class RestaurantProfile extends Component {

  
  render() {
    console.log(this.props.restaurant)
    return (
     <div>
         {this.props.restaurant.name}
         {this.props.restaurant.address}
         {this.props.description}
         <button onClick={this.props.handleClear}>return to restaurants</button>
     </div>
    )
  }
}

 export default RestaurantProfile