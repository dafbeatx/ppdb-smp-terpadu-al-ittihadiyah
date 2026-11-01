export default function ParallaxHeroBg() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
            {/* Subtle authentic geometric accent lines for academic dignity */}
            <svg 
                className="absolute inset-0 w-full h-full text-white/5" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="school-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.4" />
                        <circle cx="24" cy="24" r="1" fill="currentColor" fillOpacity="0.3" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#school-grid)" />
            </svg>
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-700/10 blur-3xl pointer-events-none" />
        </div>
    )
}
