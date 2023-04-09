import './ControlledButton.scss'
import React from 'react'

type ControlledButtonType = {
    id: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    text: string;
}

const ControlledButton = ({id, text, onClick}: ControlledButtonType) : JSX.Element => {
    return (
        <>
            <button id={id} className='controlledButton' onClick={onClick}>{text}</button>
        </>

    )
}

export default ControlledButton