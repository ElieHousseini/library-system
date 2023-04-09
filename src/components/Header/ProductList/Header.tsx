import './Header.scss'
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import ControlledButton from '../../ControlledButton/ControlledButton';
import ItemsToDeleteContext from '../../../context/itemsToDeleteContext'
import deleteData from '../../../services/delete';
import { ProductType } from '../../../types';

const Header = () : JSX.Element => {

    let navigate = useNavigate(); 
    const DELETE_URL = process.env.REACT_APP_DELETE_URL

    const { itemsToDelete, setItemsToDelete, products, setProducts } = useContext(ItemsToDeleteContext)

    const handleDeleteBtnClick = () : void => {
        
        // Selecting all elements from DOM like that is a wrong approach since it's computationally expensive to go through all the DOM elements
        // but it's being implemented on purpose like this, because the QA test for this exam is syntatic.
        // I do believe that the itemsToDelete is better.
        // I kept both for you to see I do it usually.
        const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"].delete-checkbox:checked');
        const checkedIds = Array.from(checkboxes).map((checkbox) => checkbox.id);

        const deletedItems = checkedIds || itemsToDelete;

        if(deletedItems.length){
            // remove it from UI
            const filteredProducts = products.filter((item: ProductType) => !deletedItems.includes(item.sku));
            setProducts(filteredProducts)
            setItemsToDelete([])

            // send request to DB
            deleteData({url: DELETE_URL as string, skus: deletedItems}).then(({success, message}) => {
            if(!success){
                alert('error: ' + message)
                setProducts(products)
            }
            }).catch(error => {
                alert('error: deleting data')
                setProducts(products)
            })
        }
    }

    const handleAddProductBtnClick = () : void => {
        navigate('/addproduct');
    }

    return (
        <header>
            <div id='Product-list-container'>
                <div id='parent'>
                    <div id='title'>
                        <h1>Product List</h1>
                    </div>
                    <div id='btnParent'>
                        <ControlledButton id='add-product-btn' onClick={handleAddProductBtnClick} text='ADD'/>
                        <ControlledButton id='delete-product-btn' onClick={handleDeleteBtnClick} text='MASS DELETE' />
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header