import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row } from 'reactstrap'
import './App.css'
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'
import ItemModal from './components/ItemModal'
import { loadUser } from './actions/authActions'
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <AppNavbar />
          <AppHeader />
          <div className='content'>
            <Container>
              <Row className='card-content'>
                <ItemModal />
                <ShoppingList />
              </Row>
            </Container>
          </div>
          <AppFooter />
        </div>
      </Provider>
    )
  }
}

export default App
