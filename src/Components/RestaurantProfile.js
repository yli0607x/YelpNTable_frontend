import React, { Component } from 'react'
import '../App.css';
import { connect } from "react-redux";
import { addReview } from "../actions/action";
import { fetchRestaurants } from '../actions/action'

class RestaurantProfile extends Component {

  constructor(props){
    super(props);
    this.state = {
      title : "",
      comment: "", 
      star: ""
    }
  }

  handleSubmitReview = (e) => {
    e.preventDefault()
    this.props.addReview(this.props.restaurant.id, this.props.user.id, this.state.title, this.state.comment, this.state.star);
    
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  renderReviewForm = () => {
    return  <form className="ui form" onSubmit={this.handleSubmitReview}>
    <div className="field">
      <label>Title</label>
      <input type="text" name="title" placeholder="Title" onChange={this.handleChange}/>
    </div>
    <div className="field">
      <label>Comments</label>
      <input type="text" name="comment" placeholder="Comments" onChange={this.handleChange}/>
    </div>
    <div className="field">
      <label>Rating</label>
      <input type="text" name="star" placeholder="Rating" onChange={this.handleChange}/>
    </div>
    <button className="ui button" type="submit" >Submit</button>
  </form>
  }

  renderReviews = () => {
    return this.props.restaurant.reviews.map(review => (
      <div key={review.id}>
        <div>{review.title}</div>
        <div>{review.comment}</div>
        <div>{review.star}</div>
      </div>
    ))
  }
  

  
  render() {
    console.log("what is review in restaurant profile", this.props.restaurant.reviews)
    return (
     <div>
      {this.props.restaurant.name}
      {this.props.restaurant.address}
      {this.props.restaurant.description}
      <button onClick={this.props.handleClear}>return to restaurants</button>
      {this.renderReviewForm()}
      {this.renderReviews()}
     </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    addReview: (restaurant_id, user_id, title, comment, star) => dispatch(addReview(restaurant_id, user_id, title, comment, star)),
    fetchRestaurants: ()=> dispatch(fetchRestaurants())
  }  
}

export default connect(null, mapDispatchToProps)(RestaurantProfile)