import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
  state = { activeItem: 'Restaurants' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Item 
          name='Restaurants' 
          as={ Link } 
          to='/restaurants'
          active={activeItem === 'Restaurants'} 
          onClick={this.props.handleClear} 
        />
        <Menu.Item
          as={ Link } 
          to='/profile'
          name='Profile'
          active={activeItem === 'Profile'}
          onClick={this.handleItemClick}
          
        />
        <Menu.Item
          name='Logout'
          active={activeItem === 'Logout'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}
