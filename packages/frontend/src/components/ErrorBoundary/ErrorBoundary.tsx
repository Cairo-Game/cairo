import React from 'react';
import { IErrorBoundary } from './ErrorBoundary.types';

class ErrorBoundary extends React.Component<IErrorBoundary, any> {
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
            return <h1>Что-то пошло не так :(</h1>;
        }

        return children;
    }
}

export default ErrorBoundary;
