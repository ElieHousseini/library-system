import Footer from "../components/Footer/Footer"
import Form from "../components/Form/Form"
import Header from "../components/Header/ProductAdd/Header"
import Layout from "../Layout/Layout"

const ProductAdd = () : JSX.Element => {

    return(
        <Layout>
            <Header />
            <Form />
            <Footer text="Lib System"/>
        </Layout>
    )
}

export default ProductAdd