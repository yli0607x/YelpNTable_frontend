import React, { Component } from 'react'
import '../App.css';
import NavBar from './NavBar'
import { connect } from "react-redux";



class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      reviews: [],
      user: []
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
    .then((data) => this.setState({user: data, reviews: data.reviews}))	
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
        <div>id is {review.id}</div>
        <div>{review.title}</div>
        <div>{review.comment}</div>
        <div>{review.star}</div>
        <button id={review.id} onClick={this.handleDeleteReview}>Delete</button>
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


  render() {
   console.log("what are reviews", this.state.reviews)
   //debugger
    return (
      <div>
      <NavBar />
      {this.renderUserInfo()}
      {this.renderReviews()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("inside restaurants what is state", state)
   return{
      id: state.user.user.id,
   }
 }

 export default connect(mapStateToProps)(Profile)