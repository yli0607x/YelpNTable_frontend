import React, { Component } from 'react'
import '../App.css';
import NavBar from './NavBar'
import { connect } from "react-redux";
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { withRouter, Redirect } from "react-router";

const restaurants = ["Chef's Table at Brooklyn Fare",'Peter Luger','Carbone', 'Uchu', 'Root & Bone', 'Turntable Chicken Jazz', 'Obao', 'La Contena']

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      reviews: [],
      user: [], 
      reservations: [],
      title: "", 
      comment: "", 
      star: "",
      reviewOpen: false,
      reviewId: "",
    }
  }

  componentDidMount() {
    fetch(`http://localhost:4000/api/v1/users/${this.props.id}`, {
      method: 'GET',
      headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      }
    }) 
    .then(r => r.json())
    .then((data) => this.setState({user: data, reviews: data.reviews, reservations: data.reservations}))	
  }

  renderUserInfo = () => {
    return <div>
      {this.state.user.first_name}
      {this.state.user.last_name}
    </div>
  }

  renderReviews = () => {
    return this.state.reviews.map(review => (
      <div key={review.id} id={review.id}>
        <div>Restaurant: {restaurants[review.restaurant_id-1]}</div>
        <div>Title:{review.title}</div>
        <div>Comment:{review.comment}</div>
        <div>Star:{review.star}</div>
        <Button id={review.id} onClick={this.handleDeleteReview}>Delete</Button>
        <Modal trigger={<Button id={review.id} onClick={this.handleEditReviewSetState}>Edit</Button>} open={this.state.ReviewOpen} >
          <Modal.Content >
            <form className="ui form" onSubmit={this.handleSubmitReview} style={{ maxWidth: 400, marginLeft: "auto", marginRight: "auto", display: "block" }}>
            <div className="field">
              <label>Title</label>
              <input type="text" name="title" placeholder={this.state.title} onChange={this.handleChange}/>
            </div>
            <div className="field">
              <label>Comments</label>
              <input type="text" name="comment" placeholder={this.state.comment} onChange={this.handleChange}/>
            </div>
            <div className="field">
              <label>Rating</label>
              <input type="text" name="star" placeholder={this.state.star} onChange={this.handleChange}/>
            </div>
            <button className="ui button" type="submit" onClick={this.handleSubmitReview} >Submit</button>
          </form>
          </Modal.Content>
        </Modal>
      </div>
    )) 
  } 

  handleSubmitReview = (e) => {
    e.preventDefault()
    this.reviewClose()
    fetch(`http://localhost:4000/api/v1/users/${this.props.id}/reviews/${this.state.reviewId}`, {
        method: 'PATCH',
        headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.title,
          comment: this.state.comment, 
          star: this.state.star
        })
      }) 
      .then(r => r.json())
      .then((data) => this.setState({ reviews: data}))
  }

  reviewClose = () => this.setState({ ReviewOpen: false })

  handleEditReviewSetState = (event) => {
    var review = this.state.reviews.find(review => review.id === parseInt(event.target.id))
    this.setState({
      title: review.title,
      comment: review.comment,
      star: review.star, 
      reviewId: review.id
    }, ()=> {console.log("after setstate", this.state.title)})
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  renderReservations = () => {
    return this.state.reservations.map(reservation => (
      <div key={reservation.id} id={reservation.id}>
        <div>Restaurant: {restaurants[reservation.restaurant_id-1]}</div>
        <div>Party Size: {reservation.party_size}</div>
        <div>Date: {reservation.date}</div>
        <div>Message: {reservation.message}</div>
        <button id={reservation.id} onClick={this.handleDeleteReservation}>Delete</button>
      </div>
    )) 
  } 
  
  handleDeleteReview = (event) => {
    let reviews = this.state.reviews.filter(review=> review.id !== parseInt(event.target.id))
    this.setState({reviews})
    fetch(`http://localhost:4000/api/v1/users/${this.props.id}/reviews/${event.target.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        }
    })
  }

  handleDeleteReservation = (event) => {
    let reservations = this.state.reservations.filter(reservation=> reservation.id !== parseInt(event.target.id))
    this.setState({reservations})
    fetch(`http://localhost:4000/api/v1/users/${this.props.id}/reservations/${event.target.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        }
    })
  }


  render() {
   //console.log("are restaurants coming in?", this.props)
   //debugger
   //console.log("inside profile", this.props.isLoggedIn)
    return this.props.isLoggedIn === true ?
      <div>
      <NavBar />
      {this.renderUserInfo()}
      {this.renderReviews()}
      {this.renderReservations()}
      </div> : <Redirect to="/login" />
    
  }
}

const mapStateToProps = (state) => {
  //console.log("inside restaurants what is state", state)
   return{
      id: state.user.user.id,
      isLoggedIn: state.user.isLoggedIn,
   }
 }

 export default connect(mapStateToProps)(Profile)