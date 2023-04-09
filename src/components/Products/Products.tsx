import Styles from './Products.module.scss'
import { ChangeEvent, useContext, useEffect } from 'react'
import Product from './Product/Product'
import fetchData from '../../services/fetch'
import ItemsToDeleteContext from '../../context/itemsToDeleteContext'

const Products = () : JSX.Element => {

    const { itemsToDelete, setItemsToDelete, products, setProducts } = useContext(ItemsToDeleteContext)

    const FETCH_URL = process.env.REACT_APP_FETCH_URL
    const handleCheck = (event: ChangeEvent<HTMLInputElement>) : void => {
        const sku = event.target.id;
        if(event.target.checked){
            setItemsToDelete([...itemsToDelete, sku])
        } else {
            setItemsToDelete(itemsToDelete.filter(item => item !== sku))
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
            <div id={Styles.container}>
                <div id={Styles.parent}>
                    {
                        products.length ? products.map((product, index) => (
                            <Product isChecked={itemsToDelete.includes(product.sku)} key={index} onChange={handleCheck} product={product} />
                        )) : null
                    }
                </div>
            </div>
        </main>
    )
}

export default Products