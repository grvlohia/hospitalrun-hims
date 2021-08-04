import { Column, Container, Row } from '@hospitalrun/components'
import React, { useCallback, useState } from 'react'

import StaffSearchRequest from '../../models/StaffSearchRequest'
import StaffSearchInput from './StaffSearchInput'
import ViewStaffsTable from './ViewStaffsTable'

const SearchStaffs = () => {
  const [searchRequest, setSearchRequest] = useState<StaffSearchRequest>({ queryString: '' })

  const onSearchRequestChange = useCallback((newSearchRequest: StaffSearchRequest) => {
    setSearchRequest(newSearchRequest)
  }, [])

  return (
    <div>
      <Container>
        <Row>
          <Column md={12}>
            <StaffSearchInput onChange={onSearchRequestChange} />
          </Column>
        </Row>
        <Row>
          <Column md={12}>
            <ViewStaffsTable searchRequest={searchRequest} />
          </Column>
        </Row>
      </Container>
    </div>
  )
}

export default SearchStaffs
