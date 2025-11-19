export function LogoIcon({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lines connecting the circles */}
      <line
        x1="50"
        y1="25"
        x2="30"
        y2="70"
        stroke="#60A5FA"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="50"
        y1="25"
        x2="70"
        y2="70"
        stroke="#60A5FA"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="30"
        y1="70"
        x2="70"
        y2="70"
        stroke="#60A5FA"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Top circle */}
      <circle cx="50" cy="25" r="12" fill="#60A5FA" />
      {/* Bottom left circle */}
      <circle cx="30" cy="70" r="12" fill="#60A5FA" />
      {/* Bottom right circle */}
      <circle cx="70" cy="70" r="12" fill="#60A5FA" />
    </svg>
  );
}

