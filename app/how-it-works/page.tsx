import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'How it Works – TeraPlay Online TeraBox Player',
    description: 'Learn how TeraPlay works to play TeraBox videos in your browser. Understand the process, legal disclaimers, and how we protect your privacy.',
};

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-white mb-8">How TeraPlay Works</h1>

                <div className="space-y-8">
                    {/* Introduction */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">What is TeraPlay?</h2>
                        <p className="text-gray-300 leading-relaxed">
                            TeraPlay is a free online service that allows you to play TeraBox videos directly in your browser
                            without needing to download or install the official TeraBox app. Simply paste a public TeraBox share
                            link, and we&apos;ll resolve it to a playable video URL.
                        </p>
                    </section>

                    {/* How it Works */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">The Process</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-2">Paste Your Link</h3>
                                    <p className="text-gray-400">
                                        Copy a public TeraBox share link and paste it into the input field on our home page.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-2">We Resolve the Link</h3>
                                    <p className="text-gray-400">
                                        Our system sends your link to a third-party resolver API that extracts the direct video URL
                                        from TeraBox&apos;s servers. This process typically takes just a few seconds.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white mb-2">Watch in Your Browser</h3>
                                    <p className="text-gray-400">
                                        Once resolved, the video appears in an HTML5 player with quality options, allowing you to
                                        watch, download, or copy the direct link.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Technical Details */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Technical Details</h2>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>We use a configurable third-party resolver API to extract video URLs</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Videos are streamed directly from TeraBox&apos;s CDN servers</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>We support multiple quality options when available</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>The HTML5 video player works on all modern browsers</span>
                            </li>
                        </ul>
                    </section>

                    {/* Legal Disclaimer */}
                    <section className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">⚠️ Important Legal Disclaimer</h2>
                        <div className="space-y-3 text-gray-300">
                            <p>
                                <strong>TeraPlay does not host, store, or upload any video files.</strong> We are simply a tool
                                that helps you access publicly shared TeraBox links through a third-party resolver API.
                            </p>
                            <p>
                                All videos remain on TeraBox&apos;s servers. We act only as an intermediary to make these videos
                                playable in your browser without requiring the official app.
                            </p>
                            <p>
                                <strong>Users are responsible for ensuring they have the right to access any content they view.</strong>
                                {' '}We do not control, verify, or endorse any content accessed through our service.
                            </p>
                            <p>
                                If you are a copyright holder and believe your content is being accessed inappropriately, please
                                contact TeraBox directly, as they host the files.
                            </p>
                        </div>
                    </section>

                    {/* Privacy */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Your Privacy</h2>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>We do not store the URLs you submit</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>We do not track what videos you watch</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>We do not collect personal information</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>We do not use cookies for tracking</span>
                            </li>
                        </ul>
                        <p className="text-gray-400 mt-4 text-sm">
                            For more details, please read our <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
