// Shared TypeScript types for TeraPlay application

/**
 * Represents a video quality option with label and URL
 */
export interface Quality {
    label: string;
    url: string;
}

/**
 * Video data returned from the resolver API
 */
export interface VideoData {
    fileName: string;
    size?: string;
    thumbnail?: string;
    directUrl: string;
    qualities?: Quality[];
}

/**
 * Request body for the /api/resolve endpoint
 */
export interface ResolveRequest {
    url: string;
}

/**
 * Successful response from /api/resolve
 */
export interface ResolveSuccessResponse {
    success: true;
    fileName: string;
    size?: string;
    thumbnail?: string;
    directUrl: string;
    qualities?: Quality[];
}

/**
 * Error response from /api/resolve
 */
export interface ResolveErrorResponse {
    success: false;
    message: string;
}

/**
 * Union type for all possible /api/resolve responses
 */
export type ResolveResponse = ResolveSuccessResponse | ResolveErrorResponse;
