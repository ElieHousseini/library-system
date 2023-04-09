import './App.css';
import { Routes, Route } from "react-router-dom"
import ProductList from './pages/ProductList';
import ProductAdd from './pages/ProductAdd';

const App = () : JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={ <ProductList/> } />
      <Route path="/addproduct" element={ <ProductAdd/> } />
    </Routes>
  );
}

export default App;
