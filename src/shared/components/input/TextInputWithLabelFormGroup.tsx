import { TextInput, Label } from '@hospitalrun/components'
import React from 'react'

interface Props {
  name: string
  type: 'text' | 'email' | 'number' | 'tel' | 'password'
  value: string
  label?: string
  isEditable?: boolean
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  isRequired?: boolean
  feedback?: string
  isInvalid?: boolean
}

const TextInputWithLabelFormGroup = (props: Props) => {
  const {
    value,
    label,
    name,
    isEditable,
    onChange,
    placeholder,
    type,
    isRequired,
    feedback,
    isInvalid,
  } = props
  const id = `${name}TextInput`
  return (
    <div className="form-group">
      {label && <Label text={label} htmlFor={id} isRequired={isRequired} />}
      <TextInput
        id={id}
        type={type}
        value={value}
        disabled={!isEditable}
        placeholder={placeholder || label}
        onChange={onChange}
        isInvalid={isInvalid}
        feedback={feedback}
      />
    </div>
  )
}

TextInputWithLabelFormGroup.defaultProps = {
  value: '',
  type: 'text',
}

export default TextInputWithLabelFormGroup
