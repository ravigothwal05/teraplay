import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Online TeraBox Player – Play TeraBox Videos in Browser',
    description: 'Paste any public TeraBox link and watch it instantly in your browser without the official app. Free online TeraBox player.',
    keywords: ['terabox player', 'online terabox player', 'terabox video player', 'play terabox without app', 'terabox online'],
    authors: [{ name: 'TeraPlay' }],
    openGraph: {
        title: 'Online TeraBox Player – Play TeraBox Videos in Browser',
        description: 'Paste any public TeraBox link and watch it instantly in your browser without the official app.',
        type: 'website',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Online TeraBox Player – Play TeraBox Videos in Browser',
        description: 'Paste any public TeraBox link and watch it instantly in your browser without the official app.',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
