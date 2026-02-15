import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    // Update state so the next render will show the fallback UI
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    // Log error details for debugging
    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        const { t } = this.props;

        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center font-sans">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">
                        ⚠️
                    </div>

                    <h1 className="text-3xl font-black text-gray-800 mb-2">
                        {t('error_title')}
                    </h1>

                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        {t('error_message')}
                    </p>

                    {/* Action button to reload the application */}
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-green-700 text-white px-10 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-green-800 transition-all transform hover:-translate-y-1"
                    >
                        {t('refresh_button')}
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;