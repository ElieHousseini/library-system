import './ControlledInput.scss';
import React from 'react';

type ControlledInputPropsType = {
  labelTxt: string;
  id: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ControlledInput = ({ labelTxt, id, type, name, value, onChange }: ControlledInputPropsType): JSX.Element => {
  return (
    <div className="controlled_input">
      <label>{labelTxt}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        aria-label={name}
        min="0"
      />
    </div>
  );
};

export default ControlledInput;
