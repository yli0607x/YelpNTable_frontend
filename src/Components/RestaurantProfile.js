import React, { Component } from 'react'
import '../App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class RestaurantProfile extends Component {

  constructor(props){
    super(props);
    this.state = {
      title : "",
      comment: "", 
      star: "",
      restaurant: this.props.restaurant,
      partySize: "",
      date: new Date(),
      message: "",
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

  handleSubmitReservation = (e) => {
    e.preventDefault()
    fetch(`http://localhost:4000/api/v1/users/${this.props.user.id}/reservations`, {
        method: 'POST',
        headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurant_id: this.props.id,
          user_id: this.props.user.id,
          party_size: this.state.partySize,
          date: this.state.date, 
          message: this.state.message
        })
      }) 
      .then(r=>r.json())
      .then(response => {
        if (!response.ok) { alert("reservation created") }
      })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleChangeDate = (event) => {
    this.setState({
      date: event
    });
  }


  renderReviewForm = () => {
    return  <form className="ui form" onSubmit={this.handleSubmitReview} style={{ maxWidth: 400 }}>
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
    <button className="ui button" type="submit">Submit</button>
  </form>
  }

  renderReservationForm = () => {
    return  <form className="ui form" onSubmit={this.handleSubmitReservation} style={{ maxWidth: 400 }}>
    <div className="field">
      <label>Party Size</label>
      <input type="text" name="partySize" placeholder="Party Size" onChange={this.handleChange}/>
    </div>
    <div className="field">
      <DatePicker
        selected={this.state.date}
        onChange={this.handleChangeDate}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        timeCaption="time"
      />
    </div>
    <div className="field">
      <label>Message</label>
      <input type="text" name="message" placeholder="Optional Message" onChange={this.handleChange}/>
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
    console.log("what is reservation date in profile", this.state.date)
    //debugger
    return (
     <div>
      {this.state.restaurant.name}
      {this.state.restaurant.address}
      {this.state.restaurant.description}
      <button onClick={this.props.handleClear}>return to restaurants</button>
      {this.renderReviewForm()}
      My Reviews
      {this.renderReviews()}
      My Reservations
      {this.renderReservationForm()}
     </div>
    )
  }
}





export default RestaurantProfile