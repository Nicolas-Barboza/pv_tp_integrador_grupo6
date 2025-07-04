import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../redux/slices/productsSlice';
import Titulo from '../components/Titulo';
import styles from '../styles/ProductForm.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Lista de categorías
const CATEGORIAS = [
    'electronics',
    'jewelery',
    'men\'s clothing',
    'women\'s clothing'
];

const PRODUCTO_VACIO = {
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    stock: 0 
};

function ProductForm({ onFormSubmitSuccess }) {
    const { id: productIdParam } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const [product, setProduct] = useState(PRODUCTO_VACIO);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [errorGeneral, setErrorGeneral] = useState('');

    // Generar nuevo ID automáticamente
    const generateNewId = () => {
        if (products.length === 0) return 100;
        const maxId = Math.max(...products.map(p => p.id));
        return maxId + 1;
    };

    useEffect(() => {
        if (productIdParam && products && products.length > 0) {
            const productIdNumeric = parseInt(productIdParam, 10);
            const productToEdit = products.find(p => p.id === productIdNumeric);
            if (productToEdit) {
                setProduct({
                    title: productToEdit.title,
                    price: productToEdit.price.toString(),
                    description: productToEdit.description,
                    category: productToEdit.category,
                    image: productToEdit.image,
                    stock: productToEdit.stock || 0 // Asegurar compatibilidad con productos existentes
                });
                setModoEdicion(true);
            } else {
                console.warn(`Producto con ID "${productIdParam}" no encontrado para editar.`);
                navigate('/Home');
            }
        } else {
            setProduct(PRODUCTO_VACIO);
            setModoEdicion(false);
        }
        setErrorGeneral('');
    }, [productIdParam, products, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value,
        }));
        setErrorGeneral('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorGeneral('');

        // Validaciones Básicas
        if (!product.title.trim() || !product.price || !product.description.trim() || !product.category.trim()) {
            setErrorGeneral("Los campos Título, Precio, Descripción y Categoría son obligatorios.");
            if (onFormSubmitSuccess) onFormSubmitSuccess("Por favor, complete todos los campos obligatorios.", "error");
            return;
        }

        const priceNumeric = parseFloat(product.price);
        if (isNaN(priceNumeric) || priceNumeric <= 0) {
            setErrorGeneral("El precio debe ser un número positivo.");
            if (onFormSubmitSuccess) onFormSubmitSuccess("El precio debe ser un número positivo.", "error");
            return;
        }

        const stockNumeric = parseInt(product.stock, 10);
        if (isNaN(stockNumeric) || stockNumeric < 0) {
            setErrorGeneral("El stock debe ser un número entero positivo o cero.");
            if (onFormSubmitSuccess) onFormSubmitSuccess("El stock debe ser un número entero positivo o cero.", "error");
            return;
        }

        let productToSave = { 
            ...product,
            price: priceNumeric,
            stock: stockNumeric
        };

        let message = '';
        let notificationType = '';

        if (modoEdicion) {
            // Modo edición
            const productIdNumeric = parseInt(productIdParam, 10);
            productToSave = { ...productToSave, id: productIdNumeric };
            dispatch(updateProduct({ id: productIdNumeric, updatedProduct: productToSave }));
            message = 'Producto actualizado con éxito';
            notificationType = 'success';
        } else {
            // Modo creación
            const newId = generateNewId();
            productToSave = { ...productToSave, id: newId };
            dispatch(addProduct(productToSave));
            message = 'Producto creado con éxito';
            notificationType = 'success';
        }

        if (onFormSubmitSuccess) {
            onFormSubmitSuccess(message, notificationType);
        } else {
            navigate('/Home');
        }
    };

    const formTitle = modoEdicion ? "Editar Producto" : "Agregar Nuevo Producto";

    return (
        <div className={styles.formContainerWrapper}>
            <Titulo texto={formTitle} />
            <Card className={styles.productFormCard}>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        {modoEdicion && (
                            <Form.Group className="mb-3">
                                <Form.Label>ID:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={productIdParam}
                                    disabled
                                    readOnly
                                />
                            </Form.Group>
                        )}

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="title">Título:</Form.Label>
                            <Form.Control 
                                type="text" 
                                id="title" 
                                name="title" 
                                value={product.title} 
                                onChange={handleChange} 
                                required 
                                placeholder="Título del producto" 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="price">Precio:</Form.Label>
                            <Form.Control 
                                type="number" 
                                id="price" 
                                name="price" 
                                value={product.price} 
                                onChange={handleChange} 
                                required 
                                placeholder="Ej: 29.99" 
                                step="0.01" 
                                min="0.01"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="stock">Stock:</Form.Label>
                            <Form.Control 
                                type="number" 
                                id="stock" 
                                name="stock" 
                                value={product.stock} 
                                onChange={handleChange} 
                                required 
                                placeholder="Cantidad disponible" 
                                min="0"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="description">Descripción:</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                id="description" 
                                name="description" 
                                value={product.description} 
                                onChange={handleChange} 
                                required 
                                placeholder="Descripción detallada del producto" 
                                rows="4" 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="category">Categoría:</Form.Label>
                            <Form.Select
                                id="category"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione una categoría</option>
                                {CATEGORIAS.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="image">URL de la Imagen:</Form.Label>
                            <Form.Control 
                                type="url" 
                                id="image" 
                                name="image" 
                                value={product.image} 
                                onChange={handleChange} 
                                placeholder="https://example.com/image.jpg" 
                            />
                        </Form.Group>

                        {errorGeneral && <p className="text-danger mt-3">{errorGeneral}</p>}

                        <div className={styles.buttonContainer}>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => navigate('/Home')}
                                className={styles.cancelButton}
                            >
                                Cancelar
                            </Button>

                            <Button 
                                variant="primary" 
                                type="submit" 
                                className={styles.submitButton}
                            >
                                {modoEdicion ? "Actualizar Producto" : "Guardar Producto"}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ProductForm;