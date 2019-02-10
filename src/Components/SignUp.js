import React from 'react'
import { SignUpUser } from "../actions/userActions";
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, Segment, Checkbox } from 'semantic-ui-react'
import { Redirect } from "react-router";

class SignUp extends React.Component {

  state = {
    user_name: '',
    password: '',
    passwordConfirmation: '',
    first_name: '',
    last_name: '',
    email:'',
    profile_picture: '',
    phone: '',
    location: '',
    signedUp: false, 
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.password !== this.state.passwordConfirmation){
      alert(`password don't match, try again`)
    } else{
      this.setState({ signedUp: true })
      this.props.SignUpUser(this.state.user_name, this.state.password, this.state.first_name, this.state.last_name, this.state.email, this.state.profile_picture, this.state.phone, this.state.location )
    }
  }

  renderSignUpForm = () => {
    return <div className='login-form'>
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 101%;
      }
    `}</style>
    <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 400 }}>
        <Segment stacked>
        {/* <Image src='./images/login-logo.png' width='200px' verticalAlign='middle'/>  */}
        <Header as='h1' color='grey' textAlign='center'>
        Sign Up
        </Header>
        <Form size='large' onSubmit={this.handleSubmit}>
        <Form.Group >
        <Form.Input  width={8} name="first_name" value={this.state.first_name} type="text" placeholder="First Name" onChange={this.handleChange} />
        <Form.Input  width={8} name="last_name" value={this.state.last_name} type="text" placeholder="Last Name" onChange={this.handleChange} />
        </Form.Group>
        <Form.Input  name="email" value={this.state.email} type="text" placeholder="Email" onChange={this.handleChange} />
        <Form.Input  name="profile_picture" value={this.state.profile_picture} type="text" placeholder="Profile Picture Link" onChange={this.handleChange} />
        <Form.Input  name="user_name" value={this.state.user_name} type="text" placeholder="username" onChange={this.handleChange} />
        <Form.Input  name="location" value={this.state.location} type="text" placeholder="location" onChange={this.handleChange} />
        <Form.Input  name="phone" value={this.state.phone} type="text" placeholder="phone" onChange={this.handleChange} />
        <Form.Input  name="password" value={this.state.password} type="password" placeholder="Password" onChange={this.handleChange}/>
        <Form.Input  name="passwordConfirmation" value={this.state.passwordConfirmation} type="password" placeholder="Confirm Password" onChange={this.handleChange}/>
        <Form.Field control={Checkbox} label={{ children: 'I agree to the Terms and Conditions' }} />
        <Button fluid size='large'>
              SignUp
        </Button>
        </Form> 
        Already have an account? <a href='/login'>Login</a>
        </Segment>
        </Grid.Column>
    </Grid>   
    </div>
    
  }

  render(){
    //console.log("sign-up", this.state.phone)
    return this.state.signedUp ? <Redirect to="/login" /> : <div>{this.renderSignUpForm()}</div>
  }
}

export default connect(null, { SignUpUser })(SignUp)