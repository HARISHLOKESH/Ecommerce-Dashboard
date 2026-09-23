import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../utils/mockData';

const ProductList = ({ products, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  // Always make sure products is an array
  const safeProducts = Array.isArray(products)
    ? products.filter(Boolean)
    : [];

  // Filter products safely
  const filteredProducts =
    selectedCategory === 'All'
      ? safeProducts
      : safeProducts.filter(
          (product) =>
            product &&
            product.category === selectedCategory
        );

  // Make sure the value being spread is ALWAYS an array
  const productsToSort = Array.isArray(filteredProducts)
    ? filteredProducts
    : [];

  const sortedProducts = [...productsToSort].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.price || 0) - (b.price || 0);

      case 'price-high':
        return (b.price || 0) - (a.price || 0);

      case 'rating':
        return (b.rating || 0) - (a.rating || 0);

      default:
        return (a.name || '').localeCompare(b.name || '');
    }
  });

  return (
    <section className="product-list-container">

      {/* Controls */}
      <div className="product-controls">

        <div className="control-group">
          <label htmlFor="category">
            Category:
          </label>

          <select
            id="category"
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.target.value)
            }
            className="control-select"
          >
            {CATEGORIES.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="sort">
            Sort By:
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value)
            }
            className="control-select"
          >
            <option value="name">
              Name (A-Z)
            </option>

            <option value="price-low">
              Price (Low to High)
            </option>

            <option value="price-high">
              Price (High to Low)
            </option>

            <option value="rating">
              Rating (High to Low)
            </option>
          </select>
        </div>

      </div>

      {/* Product count */}
      <div className="products-info">
        <p>
          Showing {sortedProducts.length}{' '}
          {sortedProducts.length === 1
            ? 'product'
            : 'products'}
        </p>
      </div>

      {/* Products */}
      {sortedProducts.length === 0 ? (
        <div className="empty-state">
          <p>
            No products found in this category.
          </p>
        </div>
      ) : (
        <div className="products-grid">

          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}

        </div>
      )}

    </section>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,

  onAddToCart: PropTypes.func.isRequired
};

export default ProductList;