import { Alert, Button, Column, Container, Row, Toast } from '@hospitalrun/components'
import React, { CSSProperties, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { useUpdateTitle } from '../../page-header/title/TitleContext'
import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import useTranslator from '../../shared/hooks/useTranslator'
import { RootState } from '../../shared/store'
import { login } from '../user-slice'

const LoginPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslator()
  const updateTitle = useUpdateTitle()

  useEffect(() => {
    updateTitle('Login')
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const loginError = useSelector((state: RootState) => state.user.loginError)
  const user = useSelector((state: RootState) => state.user.user)

  const rowStyles: CSSProperties = {
    justifyContent: 'center',
  }

  const formSubmitHandler = async () => {
    dispatch(login(username, password))
  }

  if (user) {
    Toast('success', 'Logged In', `Successfully Logged In as ${username}`)
    history.push('/')
  }

  return (
    <Container>
      <form>
        <Row style={rowStyles}>
          <Column md={6}>
            {loginError ? <Alert color="danger" message={t(loginError.message)} /> : null}
          </Column>
        </Row>
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
              isInvalid={!!loginError?.username}
              feedback={t(loginError?.username)}
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
              isInvalid={!!loginError?.password}
              feedback={t(loginError?.password)}
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
