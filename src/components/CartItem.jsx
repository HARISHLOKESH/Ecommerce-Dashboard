import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../utils/helpers';

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <article className="cart-item">
      <img
        src={item.image}
        alt={item.name}
        className="cart-item-image"
      />

      <div className="cart-item-details">
        <h3>{item.name}</h3>

        <p className="cart-item-category">
          {item.category}
        </p>

        <p className="cart-item-price">
          {formatPrice(item.price)} each
        </p>
      </div>

      <div className="cart-item-quantity">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={item.quantity <= 1}
          aria-label={`Decrease quantity of ${item.name}`}
        >
          −
        </button>

        <span>{item.quantity}</span>

        <button
          type="button"
          onClick={handleIncrease}
          aria-label={`Increase quantity of ${item.name}`}
        >
          +
        </button>
      </div>

      <div className="cart-item-total">
        <strong>
          {formatPrice(itemTotal)}
        </strong>
      </div>

      <button
        type="button"
        className="remove-item-button"
        onClick={() => onRemoveItem(item.id)}
      >
        Remove
      </button>
    </article>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired,

  onUpdateQuantity: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired
};

export default CartItem;