import './Header.scss'
import { useNavigate } from "react-router-dom"
import ControlledButton from '../../ControlledButton/ControlledButton'

const Header = () : JSX.Element => {
    
    let navigate = useNavigate(); 

    const handleSaveBtnClick = () : void => {
        const submitButton = document.getElementById('form-submit') as HTMLButtonElement;
        submitButton.click()
    }

    const handleCancelBtnClick = () : void => {
        navigate('/');
    }

    return (
        <header>
            <div id='Product-add-container'>
                <div id='parent'>
                    <div id='title'>
                        <h1>Add Product</h1>
                    </div>
                    <div id='btnParent'>
                        <ControlledButton id='save-product-btn' onClick={handleSaveBtnClick} text='Save'/>
                        <ControlledButton id='cancel-product-btn' onClick={handleCancelBtnClick} text='Cancel'/>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header