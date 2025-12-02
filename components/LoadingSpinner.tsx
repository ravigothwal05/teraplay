interface LoadingSpinnerProps {
    message?: string;
}

/**
 * LoadingSpinner component displays an animated spinner with optional message
 */
export default function LoadingSpinner({ message }: LoadingSpinnerProps) {
    return (
        <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-700 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            {message && (
                <p className="mt-4 text-gray-400 text-sm">{message}</p>
            )}
        </div>
    );
}
