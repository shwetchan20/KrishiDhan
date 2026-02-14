import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        // 1. Accessing 't' from props
        const { t } = this.props;

        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    {/* 2. Using translated keys */}
                    <h1 className="text-2xl font-bold text-red-600 mb-4">
                        {t('error_title') || 'Something went wrong.'}
                    </h1>

                    <p className="mb-4 text-gray-600">
                        {t('error_message') || 'Please try refreshing the page.'}
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 mb-6"
                    >
                        {t('refresh_button') || 'Refresh'}
                    </button>

                    {/* Developer details (optional, usually hidden for farmers) */}
                    <details className="text-left text-xs text-gray-400 mt-8" style={{ whiteSpace: 'pre-wrap' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;