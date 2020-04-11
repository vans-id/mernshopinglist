import React, { Component } from 'react'
import {
  ListGroup,
  ListGroupItem,
  Button,
  Spinner,
  Badge,
  Col,
  Card,
  CardBody
} from 'reactstrap'
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'
import { connect } from 'react-redux'
import {
  getItems,
  deleteItem
} from '../actions/itemActions'
import PropTypes from 'prop-types'

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentDidMount() {
    this.props.getItems()
  }

  onDeleteClick = id => {
    this.props.deleteItem(id)
  }

  render() {
    const { items, loading } = this.props.item

    return (
      <Col md='8'>
        <Card>
          <CardBody>
            <Badge color='info' pill>
              My Shopping List{' '}
              <i className='fas fa-shopping-cart'></i>
            </Badge>

            <ListGroup className='bd-callout bd-callout-info'>
              {loading ? (
                <div className='d-flex justify-content-center'>
                  <Spinner color='info' />
                </div>
              ) : (
                <div></div>
              )}

              <TransitionGroup className='shopping-list'>
                {items.map(({ _id, name }) => (
                  <CSSTransition
                    key={_id}
                    timeout={500}
                    classNames='fade'
                  >
                    <ListGroupItem className='clearfix'>
                      {name}
                      {this.props.isAuthenticated ? (
                        <Button
                          className='remove-btn float-right'
                          color='danger'
                          size='sm'
                          onClick={() =>
                            this.onDeleteClick(_id)
                          }
                        >
                          &times;
                        </Button>
                      ) : null}
                    </ListGroupItem>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {
  getItems,
  deleteItem
})(ShoppingList)
