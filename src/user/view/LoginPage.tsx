import { Button, Column, Container, Row } from '@hospitalrun/components'
import React, { CSSProperties, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import { login } from '../user-slice'

const LoginPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const rowStyles: CSSProperties = {
    justifyContent: 'center',
  }

  const formSubmitHandler = () => {
    // console.log('Logging with the following credentials')
    // console.log(`Username: ${username}`)
    // console.log(`Password: ${password}`)
    dispatch(login(username, password))
    history.push('/')
  }

  return (
    <Container>
      <form>
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <Row style={rowStyles}>
          <Column md={6}>
            <TextInputWithLabelFormGroup
              name="username"
              isEditable
              isRequired
              label="Username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Column>
        </Row>
        <Row style={rowStyles}>
          <Column md={6}>
            <TextInputWithLabelFormGroup
              type="password"
              name="password"
              isEditable
              isRequired
              label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Column>
        </Row>
        <Row style={rowStyles}>
          <Button onClick={formSubmitHandler} color="primary">
            Login
          </Button>
        </Row>
      </form>
    </Container>
  )
}

export default LoginPage
