import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice, getStarRating } from '../utils/helpers';

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    if (!product.inStock) {
      return;
    }

    onAddToCart(product);
  };

  return (
    <article className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-card-content">
        <span className="product-category">
          {product.category}
        </span>

        <h3 className="product-name">
          {product.name}
        </h3>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-rating">
          <span>{getStarRating(product.rating)}</span>
          <span> ({product.rating})</span>
        </div>

        <div className="product-card-footer">
          <span className="product-price">
            {formatPrice(product.price)}
          </span>

          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default ProductCard;
