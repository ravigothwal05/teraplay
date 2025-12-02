import { NextRequest, NextResponse } from 'next/server';
import type {
    ResolveRequest,
    ResolveResponse
} from '@/lib/types';
import { validateTeraBoxUrl } from '@/lib/utils';
import puppeteer from 'puppeteer';

/**
 * POST /api/resolve
 * Resolves a TeraBox share link using browser automation (Puppeteer)
 * This bypasses TeraBox's anti-bot protection by simulating a real browser
 */
export async function POST(request: NextRequest) {
    let browser = null;

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

        console.log(`Resolving TeraBox URL with Puppeteer: ${body.url}`);

        // Launch headless browser with ad-blocker and security features disabled
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process',
                '--disable-blink-features=AutomationControlled',
                '--disable-extensions',
                '--disable-plugins',
                '--disable-popup-blocking',
                '--ignore-certificate-errors'
            ]
        });

        const page = await browser.newPage();

        // Disable request blocking (ad blockers, etc.)
        await page.setRequestInterception(true);
        page.on('request', (request) => {
            // Allow all requests - don't block anything
            request.continue();
        });

        // Set realistic viewport and user agent
        await page.setViewport({ width: 1920, height: 1080 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // Remove automation detection
        await page.evaluateOnNewDocument(() => {
            Object.defineProperty(navigator, 'webdriver', {
                get: () => false,
            });
        });

        // Navigate to TeraBox share link
        console.log('Navigating to TeraBox page...');
        await page.goto(body.url, {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        // Wait for page to load
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Try to find video information on the page
        console.log('Extracting video information...');

        const videoInfo = await page.evaluate(() => {
            // Try to extract file information from the page
            const fileNameElement = document.querySelector('[class*="file-name"], [class*="fileName"], .filename, .file-name');
            const fileSizeElement = document.querySelector('[class*="file-size"], [class*="fileSize"], .filesize, .file-size');

            // Try to find video element and its source
            const videoElements = document.querySelectorAll('video');
            let videoSrc = null;
            if (videoElements.length > 0) {
                videoSrc = videoElements[0].src || videoElements[0].querySelector('source')?.src;
            }

            return {
                fileName: fileNameElement?.textContent?.trim() || 'video.mp4',
                fileSize: fileSizeElement?.textContent?.trim() || null,
                videoSrc: videoSrc
            };
        });

        console.log('Video info extracted:', videoInfo);

        // If we found a video source, return it immediately
        // Even if it's a streaming URL, it might work with proper CORS handling
        if (videoInfo.videoSrc) {
            const response: ResolveResponse = {
                success: true,
                fileName: videoInfo.fileName,
                directUrl: videoInfo.videoSrc,
                size: videoInfo.fileSize || undefined,
                thumbnail: undefined,
                qualities: undefined
            };

            await browser.close();
            console.log('Successfully resolved TeraBox link with streaming URL');
            return NextResponse.json(response, { status: 200 });
        }

        // Look for download button and click it to get the actual download URL
        console.log('Looking for download button...');

        try {
            // Wait for download button to appear
            await page.waitForSelector('a[href*="download"], button:has-text("Download"), [class*="download-btn"]', { timeout: 10000 });

            // Click the download button
            const downloadButton = await page.$('a[href*="download"], button:has-text("Download"), [class*="download-btn"]');

            if (downloadButton) {
                console.log('Found download button, clicking...');

                // Set up request interception to catch the download URL
                const downloadUrl = await new Promise<string>((resolve) => {
                    page.on('response', async (response) => {
                        const url = response.url();
                        const contentType = response.headers()['content-type'] || '';

                        // Look for actual video file URLs (not streaming URLs)
                        if ((contentType.includes('video') || url.includes('.mp4')) &&
                            !url.includes('streaming') &&
                            !url.includes('m3u8')) {
                            console.log('Found direct video URL:', url);
                            resolve(url);
                        }

                        // Also check for download redirect URLs
                        if (url.includes('download') && response.status() === 302) {
                            const location = response.headers()['location'];
                            if (location) {
                                console.log('Found download redirect:', location);
                                resolve(location);
                            }
                        }
                    });

                    // Click the button
                    downloadButton.click();

                    // Timeout after 10 seconds
                    setTimeout(() => resolve(''), 10000);
                });

                if (downloadUrl) {
                    const response: ResolveResponse = {
                        success: true,
                        fileName: videoInfo.fileName,
                        directUrl: downloadUrl,
                        size: videoInfo.fileSize || undefined,
                        thumbnail: undefined,
                        qualities: undefined
                    };

                    await browser.close();
                    console.log('Successfully resolved TeraBox link via download button');
                    return NextResponse.json(response, { status: 200 });
                }
            }
        } catch (error) {
            console.log('Download button not found or click failed:', error);
        }

        // If download button approach didn't work, try to extract from page API calls
        console.log('Trying to extract download URL from page API...');

        const apiUrl = await page.evaluate(() => {
            // Try to find the download API endpoint in page scripts
            const scripts = Array.from(document.querySelectorAll('script'));
            for (const script of scripts) {
                const content = script.textContent || '';
                // Look for download API patterns
                const match = content.match(/download[^"']*["']([^"']+)/i);
                if (match) {
                    return match[1];
                }
            }
            return null;
        });

        if (apiUrl) {
            console.log('Found API URL:', apiUrl);
            // Try to call the API
            try {
                const apiResponse = await page.evaluate(async (url) => {
                    const response = await fetch(url);
                    return await response.json();
                }, apiUrl);

                console.log('API Response:', apiResponse);

                if (apiResponse && apiResponse.dlink) {
                    const response: ResolveResponse = {
                        success: true,
                        fileName: videoInfo.fileName,
                        directUrl: apiResponse.dlink,
                        size: videoInfo.fileSize || undefined,
                        thumbnail: undefined,
                        qualities: undefined
                    };

                    await browser.close();
                    console.log('Successfully resolved TeraBox link via API');
                    return NextResponse.json(response, { status: 200 });
                }
            } catch (error) {
                console.log('API call failed:', error);
            }
        }

        // If all else fails, return error
        await browser.close();
        return NextResponse.json(
            { success: false, message: 'Unable to extract direct download URL from this TeraBox link. The link may require authentication or be private.' },
            { status: 404 }
        );

    } catch (error) {
        // Clean up browser if it's still open
        if (browser) {
            try {
                await browser.close();
            } catch (closeError) {
                console.error('Error closing browser:', closeError);
            }
        }

        // Catch-all for unexpected errors
        console.error('Unexpected error in /api/resolve:', error);
        return NextResponse.json(
            { success: false, message: 'An unexpected error occurred while processing the TeraBox link. Please try again later.' },
            { status: 500 }
        );
    }
}
