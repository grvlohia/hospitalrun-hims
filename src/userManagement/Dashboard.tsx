import { Column, Container, Icon, Row } from '@hospitalrun/components'
import { IconType } from '@hospitalrun/components/dist/components/Icon/interfaces'
import React, { CSSProperties } from 'react'
import { Card } from 'react-bootstrap'
import { useHistory } from 'react-router'

interface Feature {
  icon: IconType
  title: string
  path: string
}
const Dashboard = () => {
  const history = useHistory()
  const navigateTo = (location: string) => {
    history.push(location)
  }
  const features: Feature[] = [
    {
      icon: 'patient-add',
      title: 'Create New Staff',
      path: '/usermanagement/addStaff',
    },
    {
      icon: 'patient-remove',
      title: 'Remove Staff Member',
      path: '/usermanagement/removeStaff',
    },
  ]

  const cardStyle: CSSProperties = {
    cursor: 'pointer',
    width: '10rem',
    height: '10rem',
  }
  return (
    <Container>
      <Row>
        {features.map((feature) => (
          <Column md={3} key={feature.title}>
            <Card onClick={() => navigateTo(feature.path)} style={cardStyle}>
              <Icon icon={feature.icon} />
              <h3>{feature.title}</h3>
            </Card>
          </Column>
        ))}
      </Row>
    </Container>
  )
}

export default Dashboard
