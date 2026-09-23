import React from 'react';
import PropTypes from 'prop-types';
import ProductList from '../components/ProductList';

const Products = ({ products, onAddToCart }) => {
  return (
    <main className="products-page">
      <section className="page-header">
        <h2> Product Management</h2>

        <p>
          Browse, filter and sort the available products.
        </p>
      </section>

      <ProductList
        products={products}
        onAddToCart={onAddToCart}
      />
    </main>
  );
};

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default Products;