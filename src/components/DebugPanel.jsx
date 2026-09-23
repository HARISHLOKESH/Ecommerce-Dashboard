import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const DebugPanel = ({
  currentRoute,
  productCount,
  cartItemCount,
  errorCount = 0
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [renderTime, setRenderTime] = useState(0);

  useEffect(() => {
    const start = performance.now();

    const timer = requestAnimationFrame(() => {
      const end = performance.now();
      setRenderTime(end - start);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="debug-panel-wrapper">
      <button
        type="button"
        className="debug-toggle"
        onClick={() => setIsOpen((previous) => !previous)}
      >
        {isOpen ? '✕ Hide Debug' : '🔧 Debug'}
      </button>

      {isOpen && (
        <aside className="debug-panel">
          <h3>🔧 Debug Panel</h3>

          <div className="debug-row">
            <span>Current Route</span>
            <strong>{currentRoute}</strong>
          </div>

          <div className="debug-row">
            <span>Products</span>
            <strong>{productCount}</strong>
          </div>

          <div className="debug-row">
            <span>Cart Items</span>
            <strong>{cartItemCount}</strong>
          </div>

          <div className="debug-row">
            <span>Errors</span>
            <strong>{errorCount}</strong>
          </div>

          <div className="debug-row">
            <span>Render Time</span>
            <strong>{renderTime.toFixed(2)} ms</strong>
          </div>
        </aside>
      )}
    </div>
  );
};

DebugPanel.propTypes = {
  currentRoute: PropTypes.string.isRequired,
  productCount: PropTypes.number.isRequired,
  cartItemCount: PropTypes.number.isRequired,
  errorCount: PropTypes.number
};

export default DebugPanel;