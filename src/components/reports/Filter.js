import React, { useState } from 'react'
import FilterField from './FilterField'
import reportUtils from '../../utils/reportUtils'
import {Select} from 'hds-react'

function Filter(props) {
  
  const [selectedOption, setSelectedOption] = useState(null)

  const formatOptions = options => {
    return options.map(option => {
      return {
        key: option,
        value: option,
        label: reportUtils.getOptionName(option)
      }
    })
  }
  const { id, options, type } = props
  
 return (
      <div className="report-filter">
        <h4>
            {`${reportUtils.getFilterName(id)} `}
            <Select
              inline
              clearable
              header="Valitse suodatin"
              options={formatOptions(options)}
              onChange={ data => setSelectedOption(data.value)}
            />
          </h4>
        {selectedOption && (
          <FilterField
            key={`${id}__${selectedOption}`}
            type={type}
            id={id}
            selectedOption={selectedOption}
          />
        )}
      </div>
    )
}

export default Filter
