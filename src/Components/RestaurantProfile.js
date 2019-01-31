import React, { Component } from 'react'
import '../App.css';


class RestaurantProfile extends Component {

  constructor(props){
    super(props);
    this.state = {
      title : "",
      comment: "", 
      star: "",
      restaurant: this.props.restaurant,
    }
  }

  handleSubmitReview = (e) => {
    e.preventDefault()
    fetch(`http://localhost:4000/api/v1/restaurants/${this.props.id}/reviews`, {
        method: 'POST',
        headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurant_id: this.props.id,
          user_id: this.props.user.id,
          title: this.state.title,
          comment: this.state.comment, 
          star: this.state.star
        })
      }) 
      .then(r => r.json())
      .then((data) => this.setState({ restaurant: data}))
    
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
    <button className="ui button" type="submit" onClick={this.props.handleRefetch}>Submit</button>
  </form>
  }



  renderReviews = () => {
      return this.state.restaurant.reviews.map(review => (
        <div key={review.id}>
          <div>{review.title}</div>
          <div>{review.comment}</div>
          <div>{review.star}</div>
        </div>
      )) 
  }
  
  

  
  render() {
    console.log("what is restaurant in profile", this.state.restaurant.reviews)
    //debugger
    return (
     <div>
      {this.state.restaurant.name}
      {this.state.restaurant.address}
      {this.state.restaurant.description}
      <button onClick={this.props.handleClear}>return to restaurants</button>
      {this.renderReviewForm()}
      {this.renderReviews()}
     </div>
    )
  }
}





export default RestaurantProfile