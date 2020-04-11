import React, { Component } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap'
import RegisterModal from './auth/RegisterModal'
import LoginModal from './auth/LoginModal'
import Logout from './auth/Logout'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class AppNavbar extends Component {
  state = {
    isOpen: false
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const { isAuthenticated, user } = this.props.auth
    const authLinks = (
      <React.Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>
              {user ? (
                <React.Fragment>
                  <i className='far fa-user'></i>{' '}
                  {user.name}
                </React.Fragment>
              ) : (
                ''
              )}
            </strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </React.Fragment>
    )
    const guestLinks = (
      <React.Fragment>
        <NavItem>
          <LoginModal />
        </NavItem>
        <NavItem>
          <RegisterModal />
        </NavItem>
      </React.Fragment>
    )

    return (
      <React.Fragment>
        <Navbar color='info' dark expand='md'>
          <Container>
            <NavbarBrand href='/'>
              ShoppingList
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse
              isOpen={this.state.isOpen}
              navbar
            >
              <Nav className='ml-auto' navbar>
                {isAuthenticated
                  ? authLinks
                  : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  null
)(AppNavbar)
