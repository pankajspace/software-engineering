// https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
// https://github.com/bvaughn/react-error-boundary

import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default function ErrorBoundaryApp() {
  return (
    <ErrorBoundary fallback={<h1>Something went wrong.</h1>}>
      <ComponentThatThrows />
    </ErrorBoundary>
  );
}

function ComponentThatThrows() {
  if (Math.random() > 0.5) {
    throw new Error('Error thrown from component');
  } else {
    return <h1>ComponentThatThrows</h1>
  }
}