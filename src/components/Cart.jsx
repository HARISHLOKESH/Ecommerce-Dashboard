import React from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import { calculateTotal, formatPrice } from '../utils/helpers';

const Cart = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const total = calculateTotal(items);

  if (items.length === 0) {
    return (
      <section className="cart-container empty-cart">
        <h2>🛒 Your Cart Is Empty</h2>

        <p>
          Add some products to your cart to get started.
        </p>
      </section>
    );
  }

  return (
    <section className="cart-container">
      <div className="cart-header">
        <h2>🛒 Shopping Cart</h2>

        <span>
          {items.length}{' '}
          {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total-row">
          <span>Subtotal</span>
          <strong>{formatPrice(total)}</strong>
        </div>

        <div className="cart-total-row">
          <span>Shipping</span>
          <strong>
            {total >= 500 ? 'FREE' : formatPrice(15)}
          </strong>
        </div>

        <div className="cart-total-row cart-grand-total">
          <span>Total</span>
          <strong>
            {formatPrice(total + (total >= 500 ? 0 : 15))}
          </strong>
        </div>

        <button
          type="button"
          className="checkout-button"
          onClick={onCheckout}
        >
          Proceed to Checkout →
        </button>
      </div>
    </section>
  );
};

Cart.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired
};

export default Cart;