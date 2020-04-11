import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  Card,
  CardBody
} from 'reactstrap'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions'
import PropTypes from 'prop-types'
import PleaseLogin from './PleaseLogin'

class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const newItem = {
      name: this.state.name
    }

    // Add Item via addItem action
    this.props.addItem(newItem)
    // Clear Form
    document.getElementById('add-item-form').reset()
  }

  render() {
    const { user } = this.props.auth
    return (
      <Col md='4'>
        <Card>
          <CardBody>
            {this.props.isAuthenticated ? (
              <Form
                onSubmit={this.onSubmit}
                id='add-item-form'
              >
                <FormGroup>
                  <h3 className='text-center'>
                    Welcome, {user.name}!
                  </h3>
                  <Input
                    type='text'
                    name='name'
                    id='item'
                    placeholder='Item Name'
                    onChange={this.onChange}
                    className='mt-4'
                  />
                  <Button
                    color='secondary'
                    block
                    className='mt-2 mb-4'
                  >
                    Add Item
                  </Button>
                </FormGroup>
              </Form>
            ) : (
              <PleaseLogin />
            )}
          </CardBody>
        </Card>
      </Col>
    )
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
})

export default connect(mapStateToProps, {
  addItem
})(ItemModal)
