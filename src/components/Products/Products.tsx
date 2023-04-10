import './Products.scss'
import { ChangeEvent, useEffect, useState } from 'react'
import Product from './Product/Product'
import fetchData from '../../services/fetch'
import deleteData from '../../services/delete'
import { ProductType } from '../../types'

const Products = () : JSX.Element => {

    const FETCH_URL = process.env.REACT_APP_FETCH_URL
    const DELETE_URL = process.env.REACT_APP_DELETE_URL

    const [itemsToDelete, setItemsToDelete] = useState<string[]>([])
    const [products, setProducts] = useState<ProductType[]>([])

    const handleCheck = (event: ChangeEvent<HTMLInputElement>) : void => {
        const sku = event.target.id;
        if(event.target.checked){
            setItemsToDelete([...itemsToDelete, sku])
        } else {
            setItemsToDelete(itemsToDelete.filter(item => item !== sku))
        }
    }

    const handleDeleteBtnClick = () : void => {
        const deletedItems = itemsToDelete;

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

    useEffect(() => {
        fetchData({url: FETCH_URL as string}).then((data) => {
            setProducts(data)
        })
        return () => setProducts([]);
    }, [FETCH_URL])

    return (
        <main>
            <div id='products_container'>
                <div id='parent'>
                    {
                        products.length ? products.map((product, index) => (
                            <Product isChecked={itemsToDelete.includes(product.sku)} key={index} onChange={handleCheck} product={product} />
                        )) : null
                    }
                </div>
                <button id='massDeleteBtn' onClick={handleDeleteBtnClick}/>
            </div>
        </main>
    )
}

export default Products