export default function LayoutIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Room/floor plan icon with tables */}
      <rect x="2" y="2" width="20" height="20" rx="1" stroke="currentColor" strokeWidth="2"/>
      {/* Tables positioned in room */}
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="16" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="6" y="14" width="5" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <rect x="13" y="14" width="5" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}
