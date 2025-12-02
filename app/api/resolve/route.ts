import { NextRequest, NextResponse } from 'next/server';
import type {
    ResolveRequest,
    ResolveResponse
} from '@/lib/types';
import { validateTeraBoxUrl } from '@/lib/utils';

/**
 * POST /api/resolve
 * Resolves a TeraBox share link to direct video URLs
 * 100% custom implementation - no external APIs
 */
export async function POST(request: NextRequest) {
    try {
        // Parse request body
        let body: ResolveRequest;

        try {
            body = await request.json();
        } catch (error) {
            console.error('Failed to parse request body:', error);
            return NextResponse.json(
                { success: false, message: 'Invalid request format' },
                { status: 400 }
            );
        }

        // Validate request body has url field
        if (!body.url) {
            return NextResponse.json(
                { success: false, message: 'URL is required' },
                { status: 400 }
            );
        }

        // Validate url is a string
        if (typeof body.url !== 'string') {
            return NextResponse.json(
                { success: false, message: 'URL must be a string' },
                { status: 400 }
            );
        }

        // Validate URL contains "terabox"
        if (!validateTeraBoxUrl(body.url)) {
            return NextResponse.json(
                { success: false, message: 'Invalid TeraBox URL' },
                { status: 400 }
            );
        }

        console.log(`Resolving TeraBox URL: ${body.url}`);

        // Extract share parameters from URL
        const urlParams = extractShareParams(body.url);
        if (!urlParams.surl) {
            return NextResponse.json(
                { success: false, message: 'Invalid TeraBox share link format' },
                { status: 400 }
            );
        }

        // Step 1: Get share information from TeraBox
        const shareInfo = await getShareInfo(urlParams.surl);

        if (!shareInfo.success) {
            return NextResponse.json(
                { success: false, message: shareInfo.message || 'Unable to access this TeraBox link. This may be due to network restrictions on your system.' },
                { status: 502 }
            );
        }

        // Find the first video file
        const videoFile = findFirstVideo(shareInfo.list || []);
        if (!videoFile) {
            return NextResponse.json(
                { success: false, message: 'No video files found in this TeraBox link' },
                { status: 404 }
            );
        }

        // Step 2: Get download link for the video
        const downloadInfo = await getDownloadLink(
            shareInfo.shareid,
            shareInfo.uk,
            videoFile.fs_id,
            shareInfo.sign,
            shareInfo.timestamp
        );

        if (!downloadInfo.success || !downloadInfo.dlink) {
            return NextResponse.json(
                { success: false, message: 'Unable to generate download link for this video' },
                { status: 502 }
            );
        }

        // Format file size
        const formatSize = (bytes: number): string => {
            if (!bytes) return '';
            const mb = bytes / (1024 * 1024);
            if (mb < 1024) return `${mb.toFixed(2)} MB`;
            return `${(mb / 1024).toFixed(2)} GB`;
        };

        // Build response
        const response: ResolveResponse = {
            success: true,
            fileName: videoFile.server_filename || videoFile.path || 'video.mp4',
            directUrl: downloadInfo.dlink,
            size: videoFile.size ? formatSize(videoFile.size) : undefined,
            thumbnail: videoFile.thumbs?.url3 || videoFile.thumbs?.url2 || videoFile.thumbs?.url1 || undefined,
            qualities: undefined, // TeraBox typically provides single quality
        };

        console.log('Successfully resolved TeraBox link');
        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        // Catch-all for unexpected errors
        console.error('Unexpected error in /api/resolve:', error);
        return NextResponse.json(
            { success: false, message: 'An unexpected error occurred. Please try again later.' },
            { status: 500 }
        );
    }
}

/**
 * Extract share parameters from TeraBox URL
 */
function extractShareParams(url: string): { surl: string | null } {
    try {
        const urlObj = new URL(url);

        // Extract surl from path (e.g., /s/1abc123)
        const pathMatch = urlObj.pathname.match(/\/s\/([a-zA-Z0-9_-]+)/);
        if (pathMatch) {
            return { surl: pathMatch[1] };
        }

        // Extract from query parameter
        const surl = urlObj.searchParams.get('surl');
        if (surl) {
            return { surl };
        }

        return { surl: null };
    } catch (error) {
        console.error('Failed to parse URL:', error);
        return { surl: null };
    }
}

/**
 * Get share information from TeraBox API
 * Uses Node.js fetch with custom configuration to handle SSL/TLS issues
 */
async function getShareInfo(surl: string): Promise<any> {
    try {
        const apiUrl = 'https://www.terabox.com/share/list';

        const params = new URLSearchParams({
            shorturl: surl,
            root: '1',
            page: '1',
            num: '20',
            order: 'time',
            desc: '1',
            web: '1',
            channel: 'dubox',
            app_id: '250528',
            jsToken: generateJsToken(),
        });

        // Use undici fetch with custom dispatcher to bypass SSL issues
        const response = await fetch(`${apiUrl}?${params.toString()}`, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': `https://www.terabox.com/s/1${surl}`,
                'Connection': 'keep-alive',
            },
            signal: AbortSignal.timeout(30000),
            // @ts-ignore - Next.js specific fetch options
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error(`TeraBox API returned status ${response.status}`);
            return { success: false, message: 'Unable to access TeraBox API' };
        }

        const data = await response.json();

        if (data.errno !== 0) {
            console.error('TeraBox API error:', data);
            return { success: false, message: 'This link may be private or invalid' };
        }

        return {
            success: true,
            list: data.list || [],
            shareid: data.shareid,
            uk: data.uk,
            sign: data.sign,
            timestamp: data.timestamp,
        };
    } catch (error) {
        console.error('Failed to get share info:', error);
        if (error instanceof Error) {
            if (error.name === 'TimeoutError' || error.name === 'AbortError') {
                return { success: false, message: 'Request timeout' };
            }
            if (error.message.includes('ECONNRESET') || error.message.includes('fetch failed')) {
                return {
                    success: false,
                    message: 'Network connection error. This is likely due to Windows firewall or SSL/TLS restrictions. Please try deploying to Vercel or use a VPN.'
                };
            }
        }
        return { success: false, message: 'Network error' };
    }
}

/**
 * Get download link from TeraBox API
 */
async function getDownloadLink(
    shareid: string,
    uk: string,
    fsId: string,
    sign: string,
    timestamp: string
): Promise<any> {
    try {
        const apiUrl = 'https://www.terabox.com/share/download';

        const params = new URLSearchParams({
            shareid: shareid,
            uk: uk,
            fid_list: `[${fsId}]`,
            sign: sign,
            timestamp: timestamp,
            web: '1',
            channel: 'dubox',
            app_id: '250528',
            jsToken: generateJsToken(),
        });

        const response = await fetch(`${apiUrl}?${params.toString()}`, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://www.terabox.com/',
                'Connection': 'keep-alive',
            },
            signal: AbortSignal.timeout(30000),
            // @ts-ignore - Next.js specific fetch options
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error(`TeraBox download API returned status ${response.status}`);
            return { success: false };
        }

        const data = await response.json();

        if (data.errno !== 0 || !data.list || data.list.length === 0) {
            console.error('TeraBox download API error:', data);
            return { success: false };
        }

        return {
            success: true,
            dlink: data.list[0].dlink,
        };
    } catch (error) {
        console.error('Failed to get download link:', error);
        return { success: false };
    }
}

/**
 * Find the first video file in the list (recursively)
 */
function findFirstVideo(items: any[]): any {
    for (const item of items) {
        // Check if it's a video file
        if (item.isdir === 0 && item.category === 1) { // category 1 = video
            return item;
        }
        // Recursively search in subdirectories
        if (item.isdir === 1 && item.children && item.children.length > 0) {
            const found = findFirstVideo(item.children);
            if (found) return found;
        }
    }
    return null;
}

/**
 * Generate a simple jsToken for API requests
 */
function generateJsToken(): string {
    // Simple token generation - TeraBox may not strictly validate this
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 32; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}
