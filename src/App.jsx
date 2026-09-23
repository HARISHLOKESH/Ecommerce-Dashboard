import React, {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';

import Header from './components/Header';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';
import DebugPanel from './components/DebugPanel';

import Home from './pages/Home';
import Products from './pages/Products';
import CartPage from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';

import { PRODUCTS } from './utils/mockData';

import './styles/App.css';
import './styles/responsive.css';


const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();



  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(
        'techstore_user'
      );

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch {
      return null;
    }
  });


  const [products] = useState(PRODUCTS);
  const [cartItems, setCartItems] = useState([]);
  const [errorCount, setErrorCount] = useState(0);


  useEffect(() => {
    if (
      user &&
      location.pathname === '/login'
    ) {
      navigate('/', { replace: true });
    }
  }, [user, location.pathname, navigate]);




  const cartItemCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cartItems]);



  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);

    localStorage.setItem(
      'techstore_user',
      JSON.stringify(loggedInUser)
    );

    navigate('/');
  };



  const handleLogout = () => {
    setUser(null);

    localStorage.removeItem(
      'techstore_user'
    );

    setCartItems([]);

    navigate('/login');
  };



  const handleAddToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1
        }
      ];
    });
  };



  const handleUpdateQuantity = (
    productId,
    quantity
  ) => {
    if (quantity < 1) {
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity
            }
          : item
      )
    );
  };


  const handleRemoveItem = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  };


  const handleCheckout = () => {
    navigate('/checkout');
  };



  const handleOrderComplete = (order) => {
    console.log(
      'Order completed:',
      order
    );

    setCartItems([]);

    alert(
      `Order placed successfully!\nOrder ID: ${order.orderId}`
    );

    navigate('/');
  };


  const handleApplicationError = () => {
    setErrorCount(
      (currentCount) =>
        currentCount + 1
    );
  };



  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              onLogin={handleLogin}
            />
          }
        />

        <Route
          path="*"
          element={
            <Login
              onLogin={handleLogin}
            />
          }
        />
      </Routes>
    );
  }


  return (
    <div className="app">

      <Header
        cartItemCount={cartItemCount}
        onCartClick={() =>
          navigate('/cart')
        }
      />

      <div className="auth-bar">
        <span>
           {user.name}
        </span>

        <span>
          {user.email}
        </span>

        <button
          type="button"
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>

      <Navigation />

      <ErrorBoundary
        onError={
          handleApplicationError
        }
      >

        <Routes>

          {/* HOME */}

          <Route
            path="/"
            element={
              <Home
                products={products}
                cartItemCount={
                  cartItemCount
                }
              />
            }
          />


          {/* PRODUCTS */}

          <Route
            path="/products"
            element={
              <Products
                products={products}
                onAddToCart={
                  handleAddToCart
                }
              />
            }
          />


          {/* CART */}

          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                onUpdateQuantity={
                  handleUpdateQuantity
                }
                onRemoveItem={
                  handleRemoveItem
                }
                onCheckout={
                  handleCheckout
                }
              />
            }
          />


          {/* CHECKOUT */}

          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={cartItems}
                onOrderComplete={
                  handleOrderComplete
                }
              />
            }
          />


          {/* 404 */}

          <Route
            path="*"
            element={
              <main className="not-found-page">

                <h2>
                  404 - Page Not Found
                </h2>

                <p>
                  The page you're looking
                  for doesn't exist.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate('/')
                  }
                >
                  Go Home
                </button>

              </main>
            }
          />

        </Routes>

      </ErrorBoundary>


      {/* DEBUG PANEL */}

      <DebugPanel
        currentRoute={
          location.pathname
        }
        productCount={
          products.length
        }
        cartItemCount={
          cartItemCount
        }
        errorCount={
          errorCount
        }
      />

    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;