interface AdSlotProps {
    slotId: string;
}

/**
 * AdSlot component - Placeholder for future ad network integration
 * Renders an empty div with a unique ID for ad injection
 */
export default function AdSlot({ slotId }: AdSlotProps) {
    return (
        <div
            id={slotId}
            className="w-full min-h-[100px] bg-gray-900/30 border border-gray-800 rounded-lg flex items-center justify-center"
            data-ad-slot={slotId}
        >
            <span className="text-gray-600 text-xs">Ad Space</span>
        </div>
    );
}
