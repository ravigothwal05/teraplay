// Utility functions for TeraPlay application

/**
 * Validates if a URL is a valid TeraBox share link
 * @param url - The URL string to validate
 * @returns true if the URL contains "terabox", false otherwise
 */
export function validateTeraBoxUrl(url: string): boolean {
    if (!url || typeof url !== 'string') {
        return false;
    }

    const trimmedUrl = url.trim();

    if (trimmedUrl.length === 0) {
        return false;
    }

    // Check if URL contains "terabox" (case-insensitive)
    return trimmedUrl.toLowerCase().includes('terabox');
}

/**
 * Gets a user-friendly validation error message for a URL
 * @param url - The URL string to validate
 * @returns Error message string, or null if valid
 */
export function getUrlValidationError(url: string): string | null {
    if (!url || url.trim().length === 0) {
        return 'Please enter a TeraBox link';
    }

    if (!validateTeraBoxUrl(url)) {
        return 'URL must be a TeraBox share link';
    }

    return null;
}

/**
 * Formats file size from bytes to human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "750 MB")
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Safely encodes a URL component
 * @param str - String to encode
 * @returns Encoded string
 */
export function encodeUrlParam(str: string): string {
    return encodeURIComponent(str);
}

/**
 * Extracts a clean filename from a full path or URL
 * @param path - File path or URL
 * @returns Clean filename
 */
export function getCleanFilename(path: string): string {
    const parts = path.split('/');
    return parts[parts.length - 1] || path;
}
