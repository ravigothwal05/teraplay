import React from 'react';
import Link from 'next/link';

/**
 * Footer component with copyright and disclaimer
 */
export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900/50 border-t border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    {/* Copyright */}
                    <div className="text-gray-400 text-sm">
                        © {currentYear} TeraPlay. All rights reserved.
                    </div>

                    {/* Links */}
                    <div className="flex items-center space-x-6">
                        <Link
                            href="/how-it-works"
                            className="text-gray-400 hover:text-white text-sm transition-colors"
                        >
                            How it Works
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-gray-400 hover:text-white text-sm transition-colors"
                        >
                            Privacy Policy
                        </Link>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                    <p className="text-gray-500 text-xs text-center">
                        <strong>Disclaimer:</strong> This site does not host any files. It only helps play publicly shared TeraBox links via a 3rd-party resolver API configured by the site owner.
                    </p>
                </div>
            </div>
        </footer>
    );
}
