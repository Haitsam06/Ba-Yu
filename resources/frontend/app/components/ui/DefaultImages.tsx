import { FileText, User, BookOpen, Calculator, Atom, Beaker, Globe, History, Languages, Code, HeartPulse, HardHat, Sprout, Briefcase } from 'lucide-react';
import { mataPelajaran } from '../../data/mockData';

/**
 * Default thumbnail placeholder for notes without images.
 * Shows a varied background color and icon based on subject.
 */
export function DefaultThumbnail({ 
    className = "", 
    subject,
    title
}: { 
    className?: string;
    subject?: string;
    title?: string;
}) {
    // Find subject data from mockData
    const subjectData = mataPelajaran.find(m => m.name === subject || m.id === subject);
    
    // Fallback colors if subject not found
    const fallbackColors = [
        'bg-indigo-100 text-indigo-500',
        'bg-emerald-100 text-emerald-500',
        'bg-amber-100 text-amber-500',
        'bg-rose-100 text-rose-500',
        'bg-sky-100 text-sky-500',
        'bg-purple-100 text-purple-500',
    ];

    // Simple hash function for consistent color based on title or subject
    const getHash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash);
    };

    const hash = getHash(subject || title || "Ba-Yu");
    const colorClass = subjectData 
        ? "" // We'll use inline style for custom hex colors
        : fallbackColors[hash % fallbackColors.length];

    const icon = subjectData?.icon || "📘";

    return (
        <div 
            className={`flex items-center justify-center ${colorClass} ${className} transition-all duration-500`}
            style={subjectData ? { backgroundColor: `${subjectData.color}15` } : {}}
        >
            <div className="flex flex-col items-center gap-2 transition-transform duration-500">
                {subjectData ? (
                    <span className="text-5xl sm:text-6xl drop-shadow-sm">{icon}</span>
                ) : (
                    <div className="flex flex-col items-center gap-2 opacity-80">
                        <BookOpen className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={1.5} />
                    </div>
                )}
            </div>
            
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
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
