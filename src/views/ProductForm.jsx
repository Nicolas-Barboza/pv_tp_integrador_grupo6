import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, updateProduct } from '../redux/slices/productsSlice';
import Titulo from '../components/Titulo';
import styles from '../styles/ProductForm.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const PRODUCTO_VACIO = {
    id: '',
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
};

function ProductForm({ onFormSubmitSuccess }) {
    const { id: productIdParam } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const [product, setProduct] = useState(PRODUCTO_VACIO);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [errorId, setErrorId] = useState('');
    const [errorGeneral, setErrorGeneral] = useState('');

    useEffect(() => {
        if (productIdParam && products && products.length > 0) {
            const productIdNumeric = parseInt(productIdParam, 10);
            const productToEdit = products.find(p => p.id === productIdNumeric);
            if (productToEdit) {
                setProduct({ ...productToEdit, id: productToEdit.id.toString() });
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
        setErrorId('');
    }, [productIdParam, products, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value,
        }));

        if (name === 'id') setErrorId('');
        setErrorGeneral('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorGeneral('');
        setErrorId('');

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

        let productToSave = { ...product };
        let message = '';
        let notificationType = '';
        let newProductId = product.id;

        if (!modoEdicion) {
            const idString = product.id.toString().trim();
            if (!idString) {
                setErrorId("El campo ID es obligatorio.");
                if (onFormSubmitSuccess) onFormSubmitSuccess("El campo ID es obligatorio.", "error");
                return;
            }
            const idNumeric = parseInt(idString, 10);
            if (isNaN(idNumeric) || idNumeric <= 0) {
                setErrorId("El ID debe ser un número entero positivo.");
                if (onFormSubmitSuccess) onFormSubmitSuccess("El ID debe ser un número entero positivo.", "error");
                return;
            }
            const idExists = products.some(p => p.id === idNumeric);
            if (idExists) {
                setErrorId("El ID ingresado ya existe. Ingrese un ID único.");
                if (onFormSubmitSuccess) onFormSubmitSuccess("El ID ingresado ya existe. Ingrese un ID único.", "error");
                return;
            }
            newProductId = idNumeric;
            productToSave = { ...productToSave, id: newProductId, price: priceNumeric };
            dispatch(addProduct(productToSave));
            message = 'Producto guardado con éxito';
            notificationType = 'success';
        } else {
            productToSave = { ...productToSave, id: parseInt(product.id, 10), price: priceNumeric };
            dispatch(updateProduct({ id: productToSave.id, updatedProduct: productToSave }));
            message = 'Producto editado con éxito';
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
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="id">ID:</Form.Label>
                            <Form.Control
                                type="number"
                                id="id"
                                name="id"
                                value={product.id}
                                onChange={handleChange}
                                required
                                placeholder="Ej: 101"
                                disabled={modoEdicion}
                                isInvalid={!!errorId}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errorId}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="title">Título:</Form.Label>
                            <Form.Control type="text" id="title" name="title" value={product.title} onChange={handleChange} required placeholder="Título del producto" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="price">Precio:</Form.Label>
                            <Form.Control type="number" id="price" name="price" value={product.price} onChange={handleChange} required placeholder="Ej: 29.99" step="0.01" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="description">Descripción:</Form.Label>
                            <Form.Control as="textarea" id="description" name="description" value={product.description} onChange={handleChange} required placeholder="Descripción detallada del producto" rows="4" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="category">Categoría:</Form.Label>
                            <Form.Control type="text" id="category" name="category" value={product.category} onChange={handleChange} required placeholder="Ej: electronics, jewelry" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="image">URL de la Imagen:</Form.Label>
                            <Form.Control type="url" id="image" name="image" value={product.image} onChange={handleChange} placeholder="https://example.com/image.jpg" />
                        </Form.Group>

                        {errorGeneral && <p className="text-danger mt-3">{errorGeneral}</p>}

                        <div className={styles.buttonContainer}>
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => navigate('/Home')}
                                className={styles.cancelButton}>Cancelar</Button>

                            <Button variant="primary" type="submit" className={styles.submitButton}>
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