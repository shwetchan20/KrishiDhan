import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error(error);
        console.error(info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 40 }}>
                    <h1>Something went wrong.</h1>
                    <button onClick={() => window.location.reload()}>
                        Refresh
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;