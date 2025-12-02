'use client';

import { useState } from 'react';
import UrlInputForm from '@/components/UrlInputForm';
import VideoPlayer from '@/components/VideoPlayer';
import ErrorAlert from '@/components/ErrorAlert';
import AdSlot from '@/components/AdSlot';
import { resolveTeraBoxUrl, getErrorMessage } from '@/lib/api';
import type { VideoData } from '@/lib/types';

export default function Home() {
    const [videoData, setVideoData] = useState<VideoData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (url: string) => {
        setIsLoading(true);
        setError(null);
        setVideoData(null);

        try {
            const response = await resolveTeraBoxUrl(url);

            if (response.success) {
                setVideoData({
                    fileName: response.fileName,
                    directUrl: response.directUrl,
                    size: response.size,
                    thumbnail: response.thumbnail,
                    qualities: response.qualities,
                });
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    };

    const handleDismissError = () => {
        setError(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                        Online TeraBox Player
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Paste any public TeraBox video link and play it instantly in your browser – no app required.
                    </p>
                </div>

                {/* Input Form */}
                <div className="mb-8">
                    <UrlInputForm onSubmit={handleSubmit} isLoading={isLoading} />
                </div>

                {/* Ad Slot below input */}
                <div className="mb-8">
                    <AdSlot slotId="ad-slot-below-input" />
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-8">
                        <ErrorAlert message={error} onDismiss={handleDismissError} />
                    </div>
                )}

                {/* Video Player */}
                {videoData && (
                    <div className="mb-8">
                        <VideoPlayer
                            title={videoData.fileName}
                            directUrl={videoData.directUrl}
                            size={videoData.size}
                            thumbnail={videoData.thumbnail}
                            qualities={videoData.qualities}
                        />
                    </div>
                )}

                {/* Ad Slot below video player */}
                {videoData && (
                    <div className="mb-12">
                        <AdSlot slotId="ad-slot-below-player" />
                    </div>
                )}

                {/* SEO Content Section */}
                <div className="mt-16 mb-12">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Play TeraBox Videos Online Without App
                        </h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-gray-300 mb-4">
                                TeraPlay is a free online TeraBox player that lets you watch TeraBox videos directly in your browser.
                                No need to download the TeraBox app or any additional software. Simply paste your TeraBox share link
                                and start watching instantly.
                            </p>
                            <p className="text-gray-300 mb-4">
                                Our online terabox video player supports multiple quality options, allowing you to choose the best
                                streaming quality for your internet connection. Whether you&apos;re on mobile or desktop, TeraPlay provides
                                a seamless viewing experience.
                            </p>
                            <p className="text-gray-300">
                                <strong>Keywords:</strong> online terabox player, terabox video player online, play terabox without app,
                                terabox online viewer, free terabox player
                            </p>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6 max-w-3xl mx-auto">
                        {/* FAQ 1 */}
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Is this site safe to use?
                            </h3>
                            <p className="text-gray-400">
                                Yes, TeraPlay is completely safe. We don&apos;t store any of your data or the videos you watch.
                                We simply help you play publicly shared TeraBox links through a secure resolver API. Your privacy
                                and security are our top priorities.
                            </p>
                        </div>

                        {/* FAQ 2 */}
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Do you host the videos?
                            </h3>
                            <p className="text-gray-400">
                                No, we don&apos;t host any video files. TeraPlay only helps you play publicly shared TeraBox links
                                by resolving them to direct video URLs. All videos remain on TeraBox&apos;s servers, and we act as
                                a convenient player interface.
                            </p>
                        </div>

                        {/* FAQ 3 */}
                        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Why is my link not working?
                            </h3>
                            <p className="text-gray-400">
                                There are several reasons why a link might not work: the file might be private (not publicly shared),
                                the link might have expired, the file might have been deleted, or there could be temporary issues
                                with TeraBox&apos;s servers. Make sure you&apos;re using a public share link and try again later if it doesn&apos;t work.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Ad Slot at bottom */}
                <div className="mt-12 hidden md:block">
                    <AdSlot slotId="ad-slot-bottom-desktop" />
                </div>
            </div>
        </div>
    );
}
