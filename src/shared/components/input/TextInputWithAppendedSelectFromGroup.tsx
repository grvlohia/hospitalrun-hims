import React, { CSSProperties } from 'react'
import { Form, InputGroup } from 'react-bootstrap'

interface SelectOption {
  label: string
  value: string
}

interface Props {
  name: string
  append?: boolean
  type?: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url'
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  className?: string
  style?: CSSProperties
  /** Options for the select element */
  appendOptions?: SelectOption[]
  selectComponentValue?: SelectOption
  onSelectAppend?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const appendStyle: CSSProperties = {
  borderRadius: '0 .25em .25em 0',
  backgroundColor: '#e9ecef',
  border: '1px solid #ced4da',
  color: '#495057',
  outline: 'none',
}

// const prependStyle: CSSProperties = {
//   borderRadius: '.25em 0 0 .25em',
//   backgroundColor: '#e9ecef',
//   border: '1px solid #ced4da',
//   color: '#495057',
//   outline: 'none',
// }

const TextInputWithAppendedSelectFormGroup = (props: Props) => {
  const {
    append,
    // prepend,
    type,
    placeholder,
    name,
    value,
    onChange,
    disabled,
    className,
    style,
    appendOptions,
    selectComponentValue,
    onSelectAppend,
  } = props
  return (
    <Form.Group>
      <InputGroup>
        <Form.Control
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={style}
          className={className}
        />

        {append && (
          <InputGroup.Append>
            <select
              style={appendStyle}
              value={selectComponentValue?.value}
              onChange={onSelectAppend}
            >
              {appendOptions?.map((op) => (
                <option key={op.label} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>
          </InputGroup.Append>
        )}
      </InputGroup>
    </Form.Group>
  )
}

TextInputWithAppendedSelectFormGroup.defaultProps = {
  value: '',
  type: 'text',
}

export default TextInputWithAppendedSelectFormGroup
