export default function TablesIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Table top */}
      <rect x="3" y="8" width="18" height="3" rx="0.5" fill="currentColor"/>
      {/* Table legs */}
      <rect x="5" y="11" width="2" height="9" rx="0.5" fill="currentColor"/>
      <rect x="17" y="11" width="2" height="9" rx="0.5" fill="currentColor"/>
    </svg>
  );
}
