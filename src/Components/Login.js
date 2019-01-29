import React from 'react';
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router";
import { LoginUser } from "../actions/userActions";
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'


class Login extends React.Component {

  state={
    user_name: "", 
    password: "",
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLoginSubmit = (e) => { 
    e.preventDefault()
    this.props.LoginUser(this.state.user_name, this.state.password)
    this.setState({ user_name: "", password: "" });
  }

  renderLoginForm = () => {
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
        <Image src='./images/login-logo.png' width='200px' verticalAlign='middle'/> 
        <Header as='h1' color='grey' textAlign='center'>
        Sign in
        </Header>
        {this.props.failedLogin ? <p>{this.props.error}</p> : null}
        <Form size='large' onSubmit={this.handleLoginSubmit}>
        <Form.Input fluid icon='user' iconPosition='left' name="username" value={this.state.user_name} type="text" placeholder="Name" onChange={this.handleChange} />
        <Form.Input fluid icon='lock' iconPosition='left' name="password" value={this.state.password} type="password" placeholder="Password" onChange={this.handleChange}/>
        <Button fluid size='large'>
              Login
        </Button>
        </Form>
       
          New to us? <a href='/register'>Sign Up</a>
      
        </Segment>
        </Grid.Column>
    </Grid>   
    </div>
  }

  render() {
    //console.log("inside login", this.state.user)
    console.log("login- loggedIn", this.props.isLoggedIn)
    return this.props.isLoggedIn ? <Redirect to="/restaurants" /> : this.renderLoginForm()
  }
}

// const mapStateToProps = ({ userReducer: { authenticatingUser, failedLogin, loggedIn, error}}) => ({
//   authenticatingUser,
//   failedLogin,
//   error,
//   loggedIn
// })

const mapStateToProps = (state) => {
  console.log("inside login", state)
  return{
      authenticatingUser: state.user.authenticatingUser,
      failedLogin: state.user.failedLogin,
      isLoggedIn: state.user.isLoggedIn,
      error: state.user.error
  }
}

export default withRouter(connect(mapStateToProps, { LoginUser })(Login))


// <form onSubmit={this.handleLoginSubmit}  >
//           <input name="user_name" value={this.state.user_name} type="text" placeholder="Name" onChange={this.handleChange}/>
//             &nbsp;
//           <input name="password" value={this.state.password} type="password" placeholder="Password" onChange={this.handleChange}/>
//           <button className="button">Login</button>
//         </form>