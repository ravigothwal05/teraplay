import type { ResolveRequest, ResolveResponse } from './types';

/**
 * Calls the /api/resolve endpoint to resolve a TeraBox share link
 * @param url - The TeraBox share URL to resolve
 * @returns Promise with the resolve response
 * @throws Error with user-friendly message if request fails
 */
export async function resolveTeraBoxUrl(url: string): Promise<ResolveResponse> {
    try {
        const requestBody: ResolveRequest = { url };

        const response = await fetch('/api/resolve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data: ResolveResponse = await response.json();

        // If response is not ok, throw error with message from API
        if (!response.ok) {
            if (data.success === false) {
                throw new Error(data.message);
            }
            throw new Error('An unexpected error occurred. Please try again later.');
        }

        return data;
    } catch (error) {
        // Network errors or other exceptions
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Unable to connect. Please check your internet connection and try again.');
    }
}

/**
 * Gets a user-friendly error message from an error object
 * @param error - The error object
 * @returns User-friendly error message string
 */
export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred. Please try again later.';
}
