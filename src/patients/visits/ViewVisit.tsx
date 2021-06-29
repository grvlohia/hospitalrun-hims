import React from 'react'
import { useParams } from 'react-router-dom'

import Loading from '../../shared/components/Loading'
import useVisit from '../hooks/useVisit'

interface Props {
  patientId: string
}
const ViewVisit = ({ patientId }: Props) => {
  const { visitId } = useParams()

  const { data: visit, status } = useVisit(patientId, visitId)

  if (visit === undefined || status === 'loading') {
    return <Loading />
  }

  return (
    <>
      <h2>{visit.reason}</h2>
      <h1>VisitForm here</h1>
    </>
  )
}

export default ViewVisit
