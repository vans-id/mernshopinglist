import React from 'react'
import { CardTitle, CardText } from 'reactstrap'

function PleaseLogin() {
  return (
    <div className='pleaseLogin'>
      <CardTitle>
        <h6>Notification</h6>
      </CardTitle>
      <CardText>
        Only <b>users</b> can manage items. Don't have
        an account? Just create a new one!
      </CardText>
    </div>
  )
}

export default PleaseLogin
