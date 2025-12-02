'use client';

import { useState, FormEvent } from 'react';
import { getUrlValidationError } from '@/lib/utils';
import LoadingSpinner from './LoadingSpinner';

interface UrlInputFormProps {
    onSubmit: (url: string) => Promise<void>;
    isLoading: boolean;
}

/**
 * UrlInputForm component handles user input for TeraBox share links
 * Includes client-side validation and loading states
 */
export default function UrlInputForm({ onSubmit, isLoading }: UrlInputFormProps) {
    const [url, setUrl] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Clear previous validation errors
        setValidationError(null);

        // Validate URL
        const error = getUrlValidationError(url);
        if (error) {
            setValidationError(error);
            return;
        }

        // Call parent submit handler
        await onSubmit(url);
    };

    const handleInputChange = (value: string) => {
        setUrl(value);
        // Clear validation error when user starts typing
        if (validationError) {
            setValidationError(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
            <div className="space-y-4">
                {/* Input field */}
                <div>
                    <label htmlFor="terabox-url" className="sr-only">
                        TeraBox Share Link
                    </label>
                    <input
                        id="terabox-url"
                        type="text"
                        value={url}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder="Paste your TeraBox share link here..."
                        disabled={isLoading}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${validationError
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-700 focus:ring-blue-500'
                            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        aria-invalid={validationError ? 'true' : 'false'}
                        aria-describedby={validationError ? 'url-error' : undefined}
                    />

                    {/* Validation error message */}
                    {validationError && (
                        <p
                            id="url-error"
                            className="mt-2 text-sm text-red-400"
                            role="alert"
                        >
                            {validationError}
                        </p>
                    )}
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isLoading || !url.trim()}
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    {isLoading ? 'Resolving...' : 'Play Video'}
                </button>

                {/* Loading spinner */}
                {isLoading && (
                    <LoadingSpinner message="Resolving link..." />
                )}
            </div>
        </form>
    );
}
