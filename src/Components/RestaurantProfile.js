import React, { Component } from 'react'
import '../App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Header, Image, Modal } from 'semantic-ui-react'


class RestaurantProfile extends Component {

  constructor(props){
    super(props);
    this.state = {
      title : "",
      comment: "", 
      star: "",
      restaurant: this.props.restaurant,
      partySize: "",
      time: new Date().toISOString(),
      message: "",
      reviewOpen: false,
      reservationOpen: false
    }
  }

  handleSubmitReview = (e) => {
    e.preventDefault()
    this.reviewClose()
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
    this.reservationClose()
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
          time: this.state.time, 
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
      time: event
    });
  }

  reviewClose = () => this.setState({ reviewOpen: false })
  reservationClose = () => this.setState({ reservationOpen: false})

  renderReviewForm = () => {
    return  <Modal trigger={<Button onClick={() => this.setState({ reviewOpen: true })} >Write a Review</Button>} open={this.state.reviewOpen} onClose={this.reviewClose} closeIcon>
    <Modal.Content >
      <form className="ui form" onSubmit={this.handleSubmitReview} style={{ maxWidth: 400, marginLeft: "auto", marginRight: "auto", display: "block" }}>
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
      <button className="ui button" type="submit" onClick={this.handleSubmitReview} >Submit</button>
    </form>
    </Modal.Content>
  </Modal>
  }

  renderReservationForm = () => {
    return  <Modal trigger={<Button onClick={() => this.setState({ reservationOpen: true })} >Make a Reservation</Button>} open={this.state.reservationOpen} onClose={this.reservationClose} closeIcon>
      <Modal.Content>
      <form className="ui form" onSubmit={this.handleSubmitReservation} style={{ maxWidth: 400, marginLeft: "auto", marginRight: "auto", display: "block" }}>
      <div className="field">
        <label>Party Size</label>
        <input type="text" name="partySize" placeholder="Party Size" onChange={this.handleChange}/>
      </div>
      <div className="field">
        <label>Date</label>
        <input type="datetime-local" name="time" value={this.state.time} step="0" onChange={this.handleChange}/>
      </div>
      <div className="field">
        <label>Message</label>
        <input type="text" name="message" placeholder="Optional Message" onChange={this.handleChange}/>
      </div>
      <button className="ui button" type="submit" onClick={this.handleSubmitReservation}>Submit</button>
    </form>
    </Modal.Content>
  </Modal>
  }



  renderReviews = () => {
      return this.state.restaurant.reviews.map(review => (
        <div key={review.id}>
          <div>Title: {review.title}</div>
          <div>Comment: {review.comment}</div>
          <div>Star: {review.star}</div>
        </div>
      )) 
  }
  
  

  
  render() {
    //console.log("what is reservation date in profile", this.state.date)
    //debugger
    console.log("what is date", this.state.time)
    return (
     <div>
      Restaurant Name: {this.state.restaurant.name}
      <br></br>
      <br></br>
      Restaurant Address: {this.state.restaurant.address}
      <br></br>
      <br></br>
      Restaurant Description: {this.state.restaurant.description}
      <br></br>
      <br></br>
      Reviews
      {this.renderReviews()}
      <hr></hr>
      {this.renderReviewForm()}
      <br></br>
      <br></br>
      {this.renderReservationForm()}
     </div>
    )
  }
}





export default RestaurantProfile