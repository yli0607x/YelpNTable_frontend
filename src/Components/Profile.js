import React, { Component } from 'react'
import '../App.css';
import NavBar from './NavBar'
import { connect } from "react-redux";

const restaurants = ["Chef's Table at Brooklyn Fare",'Peter Luger','Carbone', 'Uchu', 'Root & Bone', 'Turntable Chicken Jazz', 'Obao', 'La Contena']

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      reviews: [],
      user: [], 
      reservations: [],
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
        <button id={review.id} onClick={this.handleDeleteReview}>Delete</button>
      </div>
    )) 
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
    return (
      <div>
      <NavBar />
      {this.renderUserInfo()}
      {this.renderReviews()}
      {this.renderReservations()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log("inside restaurants what is state", state)
   return{
      id: state.user.user.id,
   }
 }

 export default connect(mapStateToProps)(Profile)