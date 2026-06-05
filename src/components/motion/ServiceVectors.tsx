export function ContentIntelligenceVector() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect x="50" y="40" width="120" height="160" rx="4" fill="none" stroke="#DC2626" strokeWidth="2" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
      </rect>
      <rect x="80" y="20" width="120" height="160" rx="4" fill="url(#docGrad)" stroke="#2563EB" strokeWidth="2" opacity="0.8">
        <animate attributeName="y" values="20;15;20" dur="4s" repeatCount="indefinite" />
      </rect>
      <rect x="110" y="0" width="120" height="160" rx="4" fill="none" stroke="#DC2626" strokeWidth="2" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="1s" />
      </rect>
      <line x1="100" y1="60" x2="180" y2="60" stroke="white" strokeWidth="2" opacity="0.5">
        <animate attributeName="x2" values="180;190;180" dur="2s" repeatCount="indefinite" />
      </line>
      <line x1="100" y1="80" x2="160" y2="80" stroke="white" strokeWidth="2" opacity="0.3" />
      <line x1="100" y1="100" x2="170" y2="100" stroke="white" strokeWidth="2" opacity="0.4" />
      <circle cx="320" cy="80" r="30" fill="none" stroke="#2563EB" strokeWidth="2" opacity="0.7">
        <animate attributeName="r" values="30;35;30" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="320" cy="80" r="15" fill="#DC2626" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <path d="M 200 140 Q 260 140 320 80" fill="none" stroke="#DC2626" strokeWidth="2" strokeDasharray="5,5" opacity="0.6">
        <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
      </path>
    </svg>
  )
}

export function AIVector() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <radialGradient id="brainGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="150" r="100" fill="url(#brainGrad)">
        <animate attributeName="r" values="100;110;100" dur="4s" repeatCount="indefinite" />
      </circle>
      <path d="M160 120 Q200 80 240 120 Q280 160 240 200 Q200 240 160 200 Q120 160 160 120" fill="none" stroke="#DC2626" strokeWidth="2" opacity="0.8">
        <animate attributeName="stroke-dasharray" values="0,500;500,0" dur="3s" repeatCount="indefinite" />
      </path>
      <circle cx="200" cy="150" r="8" fill="#DC2626">
        <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="160" cy="120" r="4" fill="#2563EB" opacity="0.8">
        <animate attributeName="cy" values="120;110;120" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="240" cy="120" r="4" fill="#2563EB" opacity="0.8">
        <animate attributeName="cy" values="120;130;120" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="210" r="4" fill="#2563EB" opacity="0.8">
        <animate attributeName="cy" values="210;200;210" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <line x1="200" y1="150" x2="160" y2="120" stroke="white" strokeWidth="1" opacity="0.3" />
      <line x1="200" y1="150" x2="240" y2="120" stroke="white" strokeWidth="1" opacity="0.3" />
      <line x1="200" y1="150" x2="200" y2="210" stroke="white" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

export function CloudSecurityVector() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <path d="M120 180 Q140 140 180 140 Q220 100 260 140 Q300 140 300 180 Q320 200 280 200 L140 200 Q100 200 120 180" fill="none" stroke="#2563EB" strokeWidth="2" opacity="0.7">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M140 160 Q160 130 190 130 Q220 100 250 130 Q280 130 280 160" fill="none" stroke="#DC2626" strokeWidth="1.5" opacity="0.5">
        <animate attributeName="d" values="M140 160 Q160 130 190 130 Q220 100 250 130 Q280 130 280 160;M140 155 Q160 125 190 125 Q220 95 250 125 Q280 125 280 155;M140 160 Q160 130 190 130 Q220 100 250 130 Q280 130 280 160" dur="4s" repeatCount="indefinite" />
      </path>
      <rect x="190" y="210" width="20" height="30" fill="none" stroke="#DC2626" strokeWidth="2" opacity="0.8" />
      <path d="M200 210 L200 200" stroke="#DC2626" strokeWidth="2" />
      <circle cx="200" cy="195" r="3" fill="#DC2626">
        <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
      </circle>
      <rect x="120" y="230" width="160" height="4" fill="#2563EB" opacity="0.3" />
      <rect x="100" y="240" width="200" height="4" fill="#DC2626" opacity="0.2" />
    </svg>
  )
}

export function DataAnalyticsVector() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <rect x="60" y="180" width="40" height="80" fill="none" stroke="#2563EB" strokeWidth="2" opacity="0.7">
        <animate attributeName="height" values="80;100;80" dur="2s" repeatCount="indefinite" />
        <animate attributeName="y" values="180;160;180" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="120" y="140" width="40" height="120" fill="none" stroke="#DC2626" strokeWidth="2" opacity="0.7">
        <animate attributeName="height" values="120;140;120" dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="y" values="140;120;140" dur="2.5s" repeatCount="indefinite" />
      </rect>
      <rect x="180" y="100" width="40" height="160" fill="none" stroke="#2563EB" strokeWidth="2" opacity="0.7">
        <animate attributeName="height" values="160;120;160" dur="3s" repeatCount="indefinite" />
        <animate attributeName="y" values="100;140;100" dur="3s" repeatCount="indefinite" />
      </rect>
      <rect x="240" y="160" width="40" height="100" fill="none" stroke="#DC2626" strokeWidth="2" opacity="0.7">
        <animate attributeName="height" values="100;130;100" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="y" values="160;130;160" dur="2.2s" repeatCount="indefinite" />
      </rect>
      <rect x="300" y="120" width="40" height="140" fill="none" stroke="#2563EB" strokeWidth="2" opacity="0.7">
        <animate attributeName="height" values="140;110;140" dur="2.8s" repeatCount="indefinite" />
        <animate attributeName="y" values="120;150;120" dur="2.8s" repeatCount="indefinite" />
      </rect>
      <path d="M50 260 L350 260" stroke="white" strokeWidth="1" opacity="0.3" />
      <circle cx="200" cy="60" r="20" fill="none" stroke="#DC2626" strokeWidth="2" opacity="0.5">
        <animate attributeName="r" values="20;25;20" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

export function CXVector() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <circle cx="200" cy="120" r="50" fill="none" stroke="#DC2626" strokeWidth="2" opacity="0.6">
        <animate attributeName="r" values="50;55;50" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="120" r="35" fill="none" stroke="#2563EB" strokeWidth="1.5" opacity="0.5">
        <animate attributeName="r" values="35;40;35" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="120" r="8" fill="#DC2626">
        <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="120" cy="200" r="6" fill="#2563EB" opacity="0.8">
        <animate attributeName="cy" values="200;190;200" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="280" cy="200" r="6" fill="#2563EB" opacity="0.8">
        <animate attributeName="cy" values="200;190;200" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="240" r="6" fill="#2563EB" opacity="0.8">
        <animate attributeName="cy" values="240;230;240" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <line x1="200" y1="120" x2="120" y2="200" stroke="white" strokeWidth="1" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite" />
      </line>
      <line x1="200" y1="120" x2="280" y2="200" stroke="white" strokeWidth="1" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.2s" repeatCount="indefinite" />
      </line>
      <line x1="200" y1="120" x2="200" y2="240" stroke="white" strokeWidth="1" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" repeatCount="indefinite" />
      </line>
    </svg>
  )
}

export function DigitalWorkplaceVector() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <rect x="100" y="80" width="200" height="130" rx="4" fill="none" stroke="#2563EB" strokeWidth="2" opacity="0.6" />
      <rect x="120" y="100" width="160" height="90" fill="none" stroke="#DC2626" strokeWidth="1" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite" />
      </rect>
      <circle cx="150" cy="180" r="8" fill="#DC2626" opacity="0.6">
        <animate attributeName="cx" values="150;160;150" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="180" r="8" fill="#2563EB" opacity="0.6">
        <animate attributeName="cx" values="200;190;200" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="250" cy="180" r="8" fill="#DC2626" opacity="0.6">
        <animate attributeName="cx" values="250;260;250" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <line x1="140" y1="120" x2="260" y2="120" stroke="white" strokeWidth="1" opacity="0.3" />
      <line x1="140" y1="135" x2="220" y2="135" stroke="white" strokeWidth="1" opacity="0.2" />
      <line x1="140" y1="150" x2="240" y2="150" stroke="white" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

export function DefaultServiceVector() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <polygon points="200,40 360,260 40,260" fill="url(#grad1)" stroke="#DC2626" strokeWidth="2" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4s" repeatCount="indefinite" />
      </polygon>
      <circle cx="200" cy="160" r="40" fill="none" stroke="#2563EB" strokeWidth="2" opacity="0.6">
        <animate attributeName="r" values="40;50;40" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="160" r="15" fill="#DC2626" opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}
