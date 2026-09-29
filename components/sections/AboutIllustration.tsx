export function AboutIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full max-w-[220px] mx-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="90" className="fill-muted/30" />
      <rect x="55" y="110" width="90" height="55" rx="6" className="fill-card" />
      <rect x="65" y="118" width="70" height="35" rx="3" className="fill-background" />
      <rect x="70" y="123" width="60" height="4" className="fill-primary" />
      <rect x="70" y="132" width="45" height="4" className="fill-primary" />
      <rect x="70" y="141" width="55" height="4" className="fill-primary" />
      <circle cx="100" cy="70" r="22" className="fill-accent" />
      <rect x="85" y="90" width="30" height="25" rx="10" className="fill-accent" />
    </svg>
  );
}