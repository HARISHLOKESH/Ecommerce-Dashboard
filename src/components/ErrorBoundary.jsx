import React from 'react';
import PropTypes from 'prop-types';
import {
  ErrorBoundary as ReactErrorBoundary
} from 'react-error-boundary';

const ErrorFallback = ({
  error,
  resetErrorBoundary
}) => {
  return (
    <div className="error-container">
      <div className="error-card">
        <h2>⚠️ Something went wrong</h2>

        <p>
          The application encountered an unexpected error.
        </p>

        <details>
          <summary>Error details</summary>

          <pre>
            {error.message}
          </pre>
        </details>

        <button
          type="button"
          onClick={resetErrorBoundary}
          className="retry-button"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

const ErrorBoundary = ({
  children,
  onError
}) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error(
          'Application Error:',
          error
        );

        console.error(
          'Component Stack:',
          info.componentStack
        );

        if (onError) {
          onError(error, info);
        }
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  onError: PropTypes.func
};

export default ErrorBoundary;