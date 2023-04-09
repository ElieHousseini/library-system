import './ControlledSwitcher.scss'

import React, {useState} from 'react'

type controlledSwitcherPropsType = {
    labelText: string,
    dropdownList: string[],
    defaultValue: string,
    name: string,
    onChange:  (event: React.ChangeEvent<HTMLSelectElement>) => void,
    id: string
  }

const ControlledSwitcher = ({labelText, dropdownList, defaultValue, name, onChange, id}: controlledSwitcherPropsType) : JSX.Element => {
    const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  
    function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>){
      setSelectedValue(e.target.value)
      onChange(e)
    }
  
    return (
        <div id="controlled_switcher">
            <label htmlFor={id}>{labelText}</label>
            <select 
            id={id}
            value={selectedValue} 
            onChange={handleOnChange}
            name={name}
            >
                {dropdownList.map((option) => (
                <option key={option} value={option} defaultValue={defaultValue}>
                {option}
                </option>
                ))}
            </select>
        </div>
    )
}

  export default ControlledSwitcher