import Footer from "../components/Footer/Footer"
import MyForm from "../components/Form/MyForm"
import Header from "../components/Header/ProductAdd/Header"
import Layout from "../Layout/Layout"

const ProductAdd = () : JSX.Element => {

    return(
        <Layout>
            <Header />
            <MyForm />
            <Footer text="Lib System"/>
        </Layout>
    )
}

export default ProductAdd