import React from 'react';
import { FileText, User } from 'lucide-react';

/**
 * Default thumbnail placeholder for notes without images.
 * Shows a soft gray background with a document icon.
 */
export function DefaultThumbnail({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 ${className}`}>
            <div className="flex flex-col items-center gap-1.5 opacity-60">
                <FileText className="w-8 h-8 text-gray-600" strokeWidth={2} />
                <span className="text-[10px] font-['Manrope'] font-bold text-gray-700 tracking-wide"></span>
            </div>
        </div>
    );
}

/**
 * Default avatar placeholder for users without profile pictures.
 * Shows a soft gray circle with a person silhouette.
 */
export function DefaultAvatar({ size = 20, className = "" }: { size?: number; className?: string }) {
    return (
        <div 
            className={`flex items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-400 shrink-0 ${className}`}
            style={{ width: size, height: size }}
        >
            <User className="text-gray-600" style={{ width: size * 0.55, height: size * 0.55 }} strokeWidth={2.5} />
        </div>
    );
}

/**
 * Avatar image with automatic fallback to DefaultAvatar.
 * Use this as a drop-in replacement for <img> tags showing user avatars.
 */
export function AvatarImage({ 
    src, 
    alt, 
    size = 20, 
    className = "" 
}: { 
    src?: string | null; 
    alt?: string; 
    size?: number; 
    className?: string;
}) {
    if (!src) {
        return <DefaultAvatar size={size} className={className} />;
    }

    return (
        <img
            src={src}
            alt={alt || "User"}
            className={`rounded-full object-cover ${className}`}
            style={{ width: size, height: size }}
            onError={(e) => {
                // If image fails to load, replace with default
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                    const placeholder = document.createElement('div');
                    placeholder.className = `flex items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-400 shrink-0 ${className}`;
                    placeholder.style.width = `${size}px`;
                    placeholder.style.height = `${size}px`;
                    placeholder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${size * 0.55}" height="${size * 0.55}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
                    parent.insertBefore(placeholder, target);
                }
            }}
        />
    );
}
