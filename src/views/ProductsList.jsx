import Titulo from '../components/Titulo';
import ProductCard from '../components/ProductCard'; // Import the renamed component
import { Link } from 'react-router-dom';

const listContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
};
const noProductsStyle = {
    textAlign: 'center',
    marginTop: '30px',
    fontSize: '1.1em',
};

const linkNuevoStyle = {
    display: 'inline-block',
    marginTop: '15px',
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px'
};

const productListWrapperStyle = {
    paddingTop: '0px',
};


function ProductsList({ products, onEliminarProducto }) { // Changed prop name
    if (!products || products.length === 0) {
        return (
            <div style={productListWrapperStyle}>
                <Titulo texto={"Lista de Productos"} />
                <div style={noProductsStyle}>
                    <p>No hay productos para mostrar.</p>
                    <Link to="/products/new" style={linkNuevoStyle}>Agregar Nuevo Producto</Link>
                </div>
            </div>
        );
    }

    return (
        <div style={productListWrapperStyle}>
            <Titulo texto={"Lista de Productos"} />
            <div style={listContainerStyle}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id} // Changed key from lu to id
                        product={product}
                        onEliminar={onEliminarProducto}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductsList;