import Footer from "../components/Footer/Footer"
import Header from "../components/Header/ProductList/Header"
import Products from "../components/Products/Products"
import Layout from "../Layout/Layout"

const ProductList = () : JSX.Element => {
    
    return (
        <Layout>
                <Header />
                <Products />
                <Footer text='Lib System' />
        </Layout>
    )
}

export default ProductList