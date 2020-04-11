import React, { Component } from 'react'
import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  NavLink
} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class LoginModal extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props
    if (error !== prevProps.error) {
      // Check for register console.error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle()
      }
    }
  }

  toggle = () => {
    // clear errors
    this.props.clearErrors()
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state
    const logUser = {
      email,
      password
    }
    // Attempt to login
    this.props.login(logUser)
  }

  render() {
    return (
      <React.Fragment>
        <NavLink onClick={this.toggle} href='#'>
          <i className='fas fa-sign-in-alt'></i> Login
        </NavLink>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            <i className='fas fa-user-plus'></i> Login
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type='text'
                  name='email'
                  id='email'
                  placeholder='Email Adress'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  onChange={this.onChange}
                />
              </FormGroup>

              {this.state.msg ? (
                <Alert color='danger' className='mt-3'>
                  {this.state.msg}
                </Alert>
              ) : null}

              <Button
                color='info'
                style={{ marginTop: '2rem' }}
                block
              >
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, {
  login,
  clearErrors
})(LoginModal)
