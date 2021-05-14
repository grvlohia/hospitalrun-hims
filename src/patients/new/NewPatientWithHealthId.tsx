import { Button } from '@hospitalrun/components'
import React, { useState } from 'react'

import TextInputWithLabelFormGroup from '../../shared/components/input/TextInputWithLabelFormGroup'
import { uuid } from '../../shared/util/uuid'

const NewPatientWithHealthId = () => {
  const [healthId, setHealthId] = useState('')
  const [purpose, setPurpose] = useState('')

  const onSave = () => {
    const requestObject = {
      requestId: uuid(),
      timestamp: new Date().toISOString(),
      query: {
        id: healthId,
        purpose,
        requester: {
          type: 'HIP',
          id: 'innomed01',
        },
      },
    }
    console.log(requestObject)
  }

  return (
    <div>
      <h1>Health Id registration</h1>
      <div className="row">
        <TextInputWithLabelFormGroup
          type="text"
          name="healthId"
          placeholder="Enter Health Id"
          isEditable
          isRequired
          value={healthId}
          onChange={(e) => setHealthId(e.target.value)}
          label="Health Id"
        />
      </div>
      <div className={['row', 'flex-column'].join(' ')}>
        {['kyc', 'link', 'kyc_and_link'].map((type) => (
          <div className="form-check" key={type}>
            <input
              className="form-check-input"
              type="radio"
              name="purpose"
              id={type}
              value={type.toUpperCase()}
              onChange={(e) => setPurpose(e.target.value)}
            />
            <label className="form-check-label" htmlFor={type}>
              {type.toUpperCase()}
            </label>
          </div>
        ))}
      </div>
      <Button onClick={onSave}>Submit</Button>
    </div>
  )
}

export default NewPatientWithHealthId
