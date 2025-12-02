'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Quality } from '@/lib/types';

interface VideoPlayerProps {
    title: string;
    thumbnail?: string;
    directUrl: string;
    size?: string;
    qualities?: Quality[];
}

/**
 * VideoPlayer component displays video with quality selection and action buttons
 */
export default function VideoPlayer({
    title,
    thumbnail,
    directUrl,
    size,
    qualities
}: VideoPlayerProps) {
    // Default to highest quality (last item) or direct URL
    const [currentUrl, setCurrentUrl] = useState(
        qualities && qualities.length > 0
            ? qualities[qualities.length - 1].url
            : directUrl
    );
    const [selectedQuality, setSelectedQuality] = useState(
        qualities && qualities.length > 0
            ? qualities[qualities.length - 1].label
            : 'Default'
    );
    const [showCopyToast, setShowCopyToast] = useState(false);
    const [copyToastMessage, setCopyToastMessage] = useState('');

    // Handle quality change
    const handleQualityChange = (quality: Quality) => {
        setCurrentUrl(quality.url);
        setSelectedQuality(quality.label);
    };

    // Handle copy to clipboard
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl);
            setCopyToastMessage('Link copied to clipboard!');
            setShowCopyToast(true);
        } catch (error) {
            console.error('Failed to copy:', error);
            setCopyToastMessage('Failed to copy link. Please try manually.');
            setShowCopyToast(true);
        }
    };

    // Auto-hide toast after 3 seconds
    useEffect(() => {
        if (showCopyToast) {
            const timer = setTimeout(() => {
                setShowCopyToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showCopyToast]);

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Video metadata */}
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                {size && (
                    <p className="text-gray-400 text-sm">Size: {size}</p>
                )}
            </div>

            {/* Thumbnail (if available and video not loaded) */}
            {thumbnail && (
                <div className="mb-4 relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                </div>
            )}

            {/* Video player */}
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
                <video
                    key={currentUrl}
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                    className="w-full h-full"
                    style={{ aspectRatio: '16/9' }}
                >
                    <source src={currentUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Quality selector */}
            {qualities && qualities.length > 0 && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Quality: {selectedQuality}
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {qualities.map((quality) => (
                            <button
                                key={quality.label}
                                onClick={() => handleQualityChange(quality)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedQuality === quality.label
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    }`}
                            >
                                {quality.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleCopyLink}
                    className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
                >
                    <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Direct Link
                    </span>
                </button>

                <a
                    href={currentUrl}
                    download
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                >
                    <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                    </span>
                </a>
            </div>

            {/* Copy toast notification */}
            {showCopyToast && (
                <div className="fixed bottom-4 right-4 bg-gray-800 border border-gray-700 rounded-lg px-6 py-3 shadow-lg animate-fade-in z-50">
                    <p className="text-white text-sm">{copyToastMessage}</p>
                </div>
            )}
        </div>
    );
}
