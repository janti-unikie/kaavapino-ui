import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import inputUtils from '../../utils/inputUtils'
import { TextInput } from 'hds-react'

const CustomInput = ({ input, meta: { error }, setRef, ...custom }) => {

  const ref = React.useRef()

  useEffect(() => {

    if ( setRef ) {
      setRef( {name: input.name, ref: ref} )
    }
  }, [])
 
  return <TextInput ref={ref} aria-label={input.name} error={inputUtils.hasError(error).toString()} {...input} {...custom} fluid='true' />
}

CustomInput.propTypes = {
  input: PropTypes.object.isRequired
}

export default CustomInput
