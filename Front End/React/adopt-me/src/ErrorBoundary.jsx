import React, { Component } from 'react';
import { Link, Redirect } from '@reach/router';

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false }
  static getDerivedStateFromError() { //lifecycle method
    return { hasError: true }
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  componentDidUpdate() { // gets called when props or states changes –– useEffect runs whenever its dependencies gets updated
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000)
      // setTimeout(() => navigate('/'), 5000) is the same thing as the line above
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    if (this.state.hasError) {
      return (
        <h1>There was an error with this listing link.
          <Link to="/">Click here</Link> to go back to the home page or wait five seconds.
        </h1>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary;