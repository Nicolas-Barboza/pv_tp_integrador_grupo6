import React from 'react';
import { useSelector } from 'react-redux';
import Titulo from '../components/Titulo';
import ProductCard from '../components/ProductCard';

const listContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
};
const noFavoritesStyle = {
    textAlign: 'center',
    marginTop: '30px',
    fontSize: '1.1em',
};

function FavoritesPage({}) {
    const favoriteProducts = useSelector(state => state.favorites.items);

    if (!favoriteProducts || favoriteProducts.length === 0) {
        return (
            <div>
                <Titulo texto={"Mis Productos Favoritos"} />
                <div style={noFavoritesStyle}>
                    <p>No tienes productos marcados como favoritos.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Titulo texto={"Mis Productos Favoritos"} />
            <div style={listContainerStyle}>
                {favoriteProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}

export default FavoritesPage;