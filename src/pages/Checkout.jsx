import React from 'react';
import PropTypes from 'prop-types';
import CheckoutForm from '../components/CheckoutForm';

const Checkout = ({
  cartItems,
  onOrderComplete
}) => {
  return (
    <main className="checkout-page">
      <CheckoutForm
        items={cartItems}
        onOrderComplete={onOrderComplete}
      />
    </main>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  onOrderComplete: PropTypes.func.isRequired
};

export default Checkout;