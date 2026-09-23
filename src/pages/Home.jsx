import React from 'react';
import PropTypes from 'prop-types';

const Home = ({ products, cartItemCount }) => {
  const totalProducts = products.length;

  const inStockProducts = products.filter(
    (product) => product.inStock
  ).length;

  const categories = new Set(
    products.map((product) => product.category)
  ).size;

  return (
    <main className="home-page">
      <section className="dashboard-welcome">
        <h2>Welcome to TechStore 👋</h2>

        <p>
          Manage products, shopping cart and orders
          from your e-commerce dashboard.
        </p>
      </section>

      <section className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-icon"></span>
          <h3>{totalProducts}</h3>
          <p>Total Products</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon"></span>
          <h3>{cartItemCount}</h3>
          <p>Cart Items</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon"></span>
          <h3>{inStockProducts}</h3>
          <p>Products In Stock</p>
        </div>

        <div className="stat-card">
          <span className="stat-icon"></span>
          <h3>{categories}</h3>
          <p>Categories</p>
        </div>
      </section>

      <section className="dashboard-info">
        <h2>Admin Dashboard</h2>

        <p>
          Use the navigation above to manage your products,
          shopping cart and checkout process.
        </p>
      </section>
    </main>
  );
};

Home.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  cartItemCount: PropTypes.number.isRequired
};

export default Home;