import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CheckoutForm = ({ items, onOrderComplete }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const shipping = subtotal >= 500 ? 0 : 15;
  const total = subtotal + shipping;

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!address.trim()) {
      newErrors.address = 'Delivery address is required.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const order = {
      orderId: `ORD-${Date.now()}`,
      customer: {
        name,
        email,
        phone,
        address
      },
      items,
      subtotal,
      shipping,
      total
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderComplete(order);
    }, 1000);
  };

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <section className="checkout-container">
        <h2>💳 Checkout</h2>
        <p>Your cart is empty.</p>
      </section>
    );
  }

  return (
    <section className="checkout-container">

      <div className="checkout-form-section">
        <h2>💳 Checkout</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="checkout-name">
              Full Name
            </label>

            <input
              id="checkout-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
            />

            {errors.name && (
              <span className="form-error">
                {errors.name}
              </span>
            )}
          </div>


          <div className="form-group">
            <label htmlFor="checkout-email">
              Email Address
            </label>

            <input
              id="checkout-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />

            {errors.email && (
              <span className="form-error">
                {errors.email}
              </span>
            )}
          </div>


          <div className="form-group">
            <label htmlFor="checkout-phone">
              Phone Number
            </label>

            <input
              id="checkout-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="9876543210"
            />

            {errors.phone && (
              <span className="form-error">
                {errors.phone}
              </span>
            )}
          </div>


          <div className="form-group">
            <label htmlFor="checkout-address">
              Delivery Address
            </label>

            <textarea
              id="checkout-address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter your delivery address"
              rows="4"
            />

            {errors.address && (
              <span className="form-error">
                {errors.address}
              </span>
            )}
          </div>


          <button
            type="submit"
            className="place-order-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Processing Order...'
              : 'Place Order'}
          </button>

        </form>
      </div>


      <aside className="checkout-summary">

        <h3>Order Summary</h3>

        {items.map((item) => (
          <div
            className="checkout-item"
            key={item.id}
          >
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>
              ₹{(
                Number(item.price) *
                Number(item.quantity)
              ).toFixed(2)}
            </span>
          </div>
        ))}

        <div className="cart-total-row">
          <span>Subtotal</span>
          <strong>
            ₹{subtotal.toFixed(2)}
          </strong>
        </div>

        <div className="cart-total-row">
          <span>Shipping</span>
          <strong>
            {shipping === 0
              ? 'FREE'
              : `₹${shipping.toFixed(2)}`}
          </strong>
        </div>

        <div className="checkout-total">
          <strong>Total</strong>
          <strong>
            ₹{total.toFixed(2)}
          </strong>
        </div>

      </aside>

    </section>
  );
};

CheckoutForm.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,

  onOrderComplete:
    PropTypes.func.isRequired
};

export default CheckoutForm;