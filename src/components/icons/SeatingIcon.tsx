export default function SeatingIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Table */}
      <rect x="9" y="12" width="12" height="2.5" rx="0.5" fill="currentColor"/>
      <rect x="10.5" y="14.5" width="1.5" height="6" rx="0.5" fill="currentColor"/>
      <rect x="18" y="14.5" width="1.5" height="6" rx="0.5" fill="currentColor"/>
      {/* Chair */}
      <rect x="3" y="11" width="5" height="1.5" rx="0.5" fill="currentColor"/>
      <rect x="3" y="4" width="5" height="7" rx="0.5" fill="currentColor" opacity="0.7"/>
      <rect x="3.5" y="12.5" width="1.5" height="5" rx="0.5" fill="currentColor"/>
      <rect x="6" y="12.5" width="1.5" height="5" rx="0.5" fill="currentColor"/>
    </svg>
  );
}
