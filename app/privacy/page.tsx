import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy – TeraPlay Online TeraBox Player',
    description: 'TeraPlay privacy policy. Learn how we handle your data, what information we collect, and how we protect your privacy.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                <p className="text-gray-400 mb-8">Last updated: December 2024</p>

                <div className="space-y-8">
                    {/* Introduction */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
                        <p className="text-gray-300 leading-relaxed">
                            At TeraPlay, we take your privacy seriously. This Privacy Policy explains how we handle information
                            when you use our service to play TeraBox videos in your browser. The short version: we collect
                            minimal data and do not track your activity.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
                        <div className="space-y-4 text-gray-300">
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Information You Provide</h3>
                                <p>
                                    When you use TeraPlay, you provide us with TeraBox share links. These links are processed
                                    in real-time and are <strong>not stored</strong> on our servers. Once the video resolution
                                    is complete, we do not retain any record of the URL you submitted.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Automatically Collected Information</h3>
                                <p>
                                    Like most websites, our servers may automatically log standard information such as:
                                </p>
                                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                                    <li>IP address (for security and error logging purposes)</li>
                                    <li>Browser type and version</li>
                                    <li>Operating system</li>
                                    <li>Timestamps of requests</li>
                                </ul>
                                <p className="mt-2">
                                    This information is used solely for debugging, security, and improving our service. It is
                                    not used to track individual users or their viewing habits.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">What We Do NOT Collect</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Personal information (name, email, phone number, etc.)</li>
                                    <li>Account credentials or login information</li>
                                    <li>Video viewing history or watch time</li>
                                    <li>Search queries or browsing patterns</li>
                                    <li>Payment information (our service is free)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Information */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">How We Use Information</h2>
                        <p className="text-gray-300 mb-3">
                            The limited information we collect is used only for:
                        </p>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span><strong>Providing the service:</strong> Processing your TeraBox links to resolve video URLs</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span><strong>Error logging:</strong> Debugging technical issues and improving reliability</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span><strong>Security:</strong> Preventing abuse and protecting against malicious activity</span>
                            </li>
                        </ul>
                    </section>

                    {/* Third-Party Services */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
                        <div className="space-y-4 text-gray-300">
                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Resolver API</h3>
                                <p>
                                    We use a third-party resolver API to extract video URLs from TeraBox links. When you submit
                                    a link, it is sent to this external service. Please note that the resolver API has its own
                                    privacy policy, which we do not control.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">TeraBox</h3>
                                <p>
                                    Videos are streamed directly from TeraBox&apos;s servers. When you watch a video, your browser
                                    connects directly to TeraBox&apos;s CDN. TeraBox may collect information about these requests
                                    according to their own privacy policy.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-white mb-2">Advertising (Future)</h3>
                                <p>
                                    We may integrate advertising networks in the future to support the service. If we do, we will
                                    update this privacy policy and use privacy-friendly ad networks that respect user privacy.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Tracking</h2>
                        <p className="text-gray-300">
                            TeraPlay does not use cookies for tracking or analytics. We do not use third-party tracking scripts,
                            analytics tools, or any technology that follows you across websites. Your browsing activity on
                            TeraPlay is private.
                        </p>
                    </section>

                    {/* Data Storage */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Data Storage and Security</h2>
                        <div className="space-y-3 text-gray-300">
                            <p>
                                We do not store user-submitted URLs or video data. All processing happens in real-time, and no
                                records are kept after the request is complete.
                            </p>
                            <p>
                                Server logs (IP addresses, timestamps, etc.) are retained only for a limited time for security
                                and debugging purposes, then automatically deleted.
                            </p>
                            <p>
                                We implement industry-standard security measures to protect our service from unauthorized access
                                and abuse.
                            </p>
                        </div>
                    </section>

                    {/* Your Rights */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
                        <p className="text-gray-300 mb-3">
                            Since we do not collect or store personal information, there is no user data to access, modify, or
                            delete. You can use TeraPlay anonymously without creating an account.
                        </p>
                        <p className="text-gray-300">
                            If you have concerns about your privacy or how we handle data, please contact us through the
                            information provided below.
                        </p>
                    </section>

                    {/* Children's Privacy */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Children&apos;s Privacy</h2>
                        <p className="text-gray-300">
                            TeraPlay is not directed at children under the age of 13. We do not knowingly collect information
                            from children. If you are a parent or guardian and believe your child has used our service, please
                            note that we do not retain any information about their usage.
                        </p>
                    </section>

                    {/* Changes to Policy */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
                        <p className="text-gray-300">
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page with
                            an updated &quot;Last updated&quot; date. We encourage you to review this policy periodically.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
                        <p className="text-gray-300">
                            If you have questions about this Privacy Policy or how we handle data, please contact us through
                            our website or the contact information provided in our service.
                        </p>
                    </section>

                    {/* Summary */}
                    <section className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-white mb-4">Summary</h2>
                        <p className="text-gray-300">
                            <strong>In short:</strong> TeraPlay is designed with privacy in mind. We don&apos;t store your URLs,
                            track your viewing habits, or collect personal information. We only process the minimum data needed
                            to provide the service, and we don&apos;t share it with anyone except the resolver API necessary to
                            make the service work.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
