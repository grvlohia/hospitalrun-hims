import { Column, Container, Icon, Row } from '@hospitalrun/components'
import { IconType } from '@hospitalrun/components/dist/components/Icon/interfaces'
import React, { CSSProperties, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useHistory } from 'react-router'

import useAddBreadcrumbs from '../page-header/breadcrumbs/useAddBreadcrumbs'
import { useUpdateTitle } from '../page-header/title/TitleContext'
import useTranslator from '../shared/hooks/useTranslator'

interface Feature {
  icon: IconType
  title: string
  path: string
}

const breadcrumbs = [{ i18nKey: 'administration.dashboard', location: '/administration' }]
const Dashboard = () => {
  const { t } = useTranslator()
  const history = useHistory()
  const updateTitle = useUpdateTitle()
  useAddBreadcrumbs(breadcrumbs, false)

  useEffect(() => {
    updateTitle(t('administration.label'))
  })
  const navigateTo = (location: string) => {
    history.push(location)
  }
  const features: Feature[] = [
    {
      icon: 'patients',
      title: 'Staff Members',
      path: '/administration/staff',
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
