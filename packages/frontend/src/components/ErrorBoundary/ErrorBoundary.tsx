import React from 'react';

class ErrorBoundary extends React.Component {
    props = {
        children: <div></div>
    };

    state = {
        hasError: false,
    };

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        const children = this.props.children;

        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return children;
    }
}

export default ErrorBoundary;
