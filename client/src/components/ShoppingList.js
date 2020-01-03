import React, { Component } from 'react'
import {
  ListGroup,
  ListGroupItem,
  Button,
  Spinner
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
  componentDidMount() {
    this.props.getItems()
  }

  onDeleteClick = id => {
    this.props.deleteItem(id)
  }

  render() {
    const { items, loading } = this.props.item

    return (
      <ListGroup>
        {loading ? (
          <div className='d-flex justify-content-center'>
            <Spinner color='danger' />
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
              <ListGroupItem>
                <Button
                  className='remove-btn'
                  color='danger'
                  size='sm'
                  onClick={() =>
                    this.onDeleteClick(_id)
                  }
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    )
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  item: state.item
})

export default connect(mapStateToProps, {
  getItems,
  deleteItem
})(ShoppingList)
