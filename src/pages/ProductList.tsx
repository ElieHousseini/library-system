import { useState } from "react"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/ProductList/Header"
import Products from "../components/Products/Products"
import Layout from "../Layout/Layout"
import ItemsToDeleteContext from "../context/itemsToDeleteContext"
import {ProductType} from '../types'

type ItemsToDeleteType = string[]

const ProductList = () : JSX.Element => {
    const [itemsToDelete, setItemsToDelete] = useState<ItemsToDeleteType>([]);
    const [products, setProducts] = useState<ProductType[]>([]);

    return (
        <Layout>
            <ItemsToDeleteContext.Provider value = {{itemsToDelete, setItemsToDelete, products, setProducts}}>
                <Header />
                <Products />
                <Footer text='Lib System' />
            </ItemsToDeleteContext.Provider>
        </Layout>
    )
}

export default ProductList