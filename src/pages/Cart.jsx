import React from 'react';
import PropTypes from 'prop-types';
import CartComponent from '../components/Cart';

const CartPage = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  return (
    <main className="cart-page">
      <CartComponent
        items={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
        onCheckout={onCheckout}
      />
    </main>
  );
};

CartPage.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired
};

export default CartPage;