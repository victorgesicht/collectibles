import { useId } from 'react'
import { getCategory } from '../data/catalog'

function ComicsMotif({ accent, ink, variant }) {
  const tilt = variant === 2 ? 2 : variant === 3 ? -2 : -4

  return (
    <g transform={`rotate(${tilt} 180 238)`}>
      <rect
        x="80"
        y="112"
        width="200"
        height="252"
        fill={ink}
        fillOpacity="0.025"
        stroke={ink}
        strokeOpacity="0.28"
      />
      <path
        d="M80 184h200M80 306h200M166 112v72M254 184v108"
        stroke={ink}
        strokeOpacity="0.22"
      />
      <circle
        cx="180"
        cy="238"
        r="82"
        fill="none"
        stroke={accent}
        strokeWidth="1.2"
        strokeOpacity="0.9"
      />
      <circle
        cx="180"
        cy="238"
        r="58"
        fill="none"
        stroke={ink}
        strokeOpacity="0.3"
        strokeDasharray="2 7"
      />
      <path
        d="M86 354h188M104 90l152 296"
        stroke={accent}
        strokeOpacity="0.3"
      />
      <circle cx="80" cy="112" r="3" fill={accent} />
      <circle cx="280" cy="364" r="3" fill={accent} />
      <g fill={accent} opacity="0.5">
        <circle cx="104" cy="140" r="1.5" />
        <circle cx="112" cy="148" r="1.5" />
        <circle cx="120" cy="156" r="1.5" />
        <circle cx="104" cy="156" r="1.5" />
        <circle cx="112" cy="164" r="1.5" />
        <circle cx="256" cy="320" r="1.5" />
        <circle cx="264" cy="312" r="1.5" />
        <circle cx="272" cy="304" r="1.5" />
        <circle cx="264" cy="328" r="1.5" />
        <circle cx="272" cy="320" r="1.5" />
      </g>
    </g>
  )
}

function GamesMotif({ accent, ink, variant }) {
  const stars = [
    [58, 150, 2],
    [82, 196, 1.5],
    [70, 286, 1.5],
    [294, 174, 2],
    [310, 246, 1.5],
    [288, 312, 1.5],
    [104, 352, 1.5],
    [262, 130, 1.5],
  ]
  const shift = (variant - 2) * 6

  return (
    <g>
      {stars.map(([cx, cy, radius]) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy + shift}
          r={radius}
          fill={accent}
          opacity="0.5"
        />
      ))}
      <g transform={`translate(0 ${shift})`}>
        <rect
          x="120"
          y="130"
          width="120"
          height="196"
          rx="7"
          fill={ink}
          fillOpacity="0.035"
          stroke={accent}
          strokeWidth="1.2"
        />
        <path
          d="M146 130v-8c0-5.5 4.5-10 10-10h48c5.5 0 10 4.5 10 10v8"
          fill="none"
          stroke={ink}
          strokeOpacity="0.4"
        />
        <rect
          x="136"
          y="158"
          width="88"
          height="96"
          fill={accent}
          fillOpacity="0.09"
          stroke={ink}
          strokeOpacity="0.35"
        />
        <path
          d="M136 266h88M136 294h88"
          stroke={ink}
          strokeOpacity="0.22"
        />
        <g fill={accent}>
          <rect x="146" y="214" width="5" height="5" />
          <rect x="155" y="221" width="5" height="5" />
          <rect x="164" y="214" width="5" height="5" />
          <rect x="197" y="214" width="5" height="5" />
          <rect x="206" y="221" width="5" height="5" />
          <rect x="215" y="214" width="5" height="5" />
        </g>
        <circle cx="152" cy="310" r="3.5" fill={accent} />
        <circle cx="168" cy="310" r="3.5" fill={ink} opacity="0.3" />
        <path
          d="M244 152h24M244 160h16"
          stroke={ink}
          strokeOpacity="0.35"
          strokeLinecap="round"
        />
        <path
          d="M96 344h168"
          stroke={accent}
          strokeOpacity="0.3"
          strokeDasharray="1 7"
        />
      </g>
    </g>
  )
}

function ComputersMotif({ accent, ink, variant }) {
  const screenShift = (variant - 2) * 4

  return (
    <g>
      <circle
        cx="180"
        cy="236"
        r="122"
        fill="none"
        stroke={ink}
        strokeOpacity="0.1"
      />
      <circle
        cx="180"
        cy="236"
        r="100"
        fill="none"
        stroke={accent}
        strokeOpacity="0.2"
        strokeDasharray="3 9"
      />
      <g transform={`translate(0 ${screenShift})`}>
        <rect
          x="88"
          y="140"
          width="184"
          height="142"
          rx="9"
          fill={ink}
          fillOpacity="0.03"
          stroke={accent}
          strokeWidth="1.2"
        />
        <rect
          x="104"
          y="156"
          width="152"
          height="98"
          fill="#090907"
          fillOpacity="0.75"
          stroke={ink}
          strokeOpacity="0.3"
        />
        <g stroke={ink} strokeOpacity="0.08">
          <path d="M104 172h152M104 188h152M104 204h152M104 220h152M104 236h152" />
        </g>
        <path
          d="M122 186h10l7 8 7-8h10"
          fill="none"
          stroke={accent}
          strokeWidth="1.4"
        />
        <path
          d="M122 212h54M122 224h84M122 236h40"
          stroke={ink}
          strokeOpacity="0.45"
          strokeLinecap="round"
        />
        <circle cx="250" cy="268" r="2.5" fill={accent} />
        <path
          d="M152 282v24h56v-24M134 306h92"
          fill="none"
          stroke={ink}
          strokeOpacity="0.35"
        />
      </g>
      <text
        x="304"
        y="156"
        textAnchor="end"
        fontFamily="'Fira Code', monospace"
        fontSize="9"
        fill={accent}
        opacity="0.65"
      >
        SYS.7
      </text>
    </g>
  )
}

function PartsMotif({ accent, ink, variant }) {
  const rotation = variant * 5

  return (
    <g>
      <g transform={`rotate(${rotation} 180 234)`}>
        {Array.from({ length: 24 }, (_, index) => (
          <line
            key={index}
            x1="180"
            y1="122"
            x2="180"
            y2="138"
            transform={`rotate(${index * 15} 180 234)`}
            stroke={accent}
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
        ))}
        <circle
          cx="180"
          cy="234"
          r="96"
          fill="none"
          stroke={accent}
          strokeOpacity="0.55"
          strokeWidth="1.2"
        />
        <circle
          cx="180"
          cy="234"
          r="74"
          fill="none"
          stroke={ink}
          strokeOpacity="0.22"
          strokeDasharray="2 8"
        />
      </g>
      <path
        d="M180 202l28 16v32l-28 16-28-16v-32l28-16Z"
        fill={ink}
        fillOpacity="0.04"
        stroke={accent}
        strokeWidth="1.2"
      />
      <path
        d="M152 234H96v-58H60M208 234h56v54h32M180 266v48h-44v36M180 202v-44h40"
        fill="none"
        stroke={ink}
        strokeOpacity="0.28"
      />
      <g fill={accent}>
        <circle cx="60" cy="176" r="3" />
        <circle cx="296" cy="288" r="3" />
        <circle cx="136" cy="350" r="3" />
        <circle cx="220" cy="158" r="3" />
      </g>
      <path
        d="M174 228h12v12h-12z"
        fill={accent}
        opacity="0.65"
      />
    </g>
  )
}

function Motif({ category, accent, ink, variant }) {
  if (category === 'comics') {
    return <ComicsMotif accent={accent} ink={ink} variant={variant} />
  }

  if (category === 'games') {
    return <GamesMotif accent={accent} ink={ink} variant={variant} />
  }

  if (category === 'computers') {
    return <ComputersMotif accent={accent} ink={ink} variant={variant} />
  }

  return <PartsMotif accent={accent} ink={ink} variant={variant} />
}

export default function CoverArt({ item, className = '' }) {
  const rawId = useId()
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '')
  const { base, accent, ink } = item.cover
  const category = getCategory(item.category)
  const initial = item.title.charAt(0)

  return (
    <svg
      viewBox="0 0 360 460"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor={base} />
          <stop offset="100%" stopColor="#0b0a08" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="44%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.16" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`${uid}-grid`}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 0H0v20"
            fill="none"
            stroke={ink}
            strokeOpacity="0.055"
          />
        </pattern>
      </defs>

      <rect width="360" height="460" fill={`url(#${uid}-bg)`} />
      <rect width="360" height="460" fill={`url(#${uid}-grid)`} />
      <rect width="360" height="460" fill={`url(#${uid}-glow)`} />

      <text
        x="180"
        y="318"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="218"
        fill={ink}
        opacity="0.045"
      >
        {initial}
      </text>

      <Motif
        category={item.category}
        accent={accent}
        ink={ink}
        variant={item.variant}
      />

      <rect
        x="18.5"
        y="18.5"
        width="323"
        height="423"
        fill="none"
        stroke={ink}
        strokeOpacity="0.18"
      />
      <path
        d="M18.5 38v-19.5H38M322 18.5h19.5V38M341.5 422v19.5H322M38 441.5H18.5V422"
        fill="none"
        stroke={accent}
        strokeOpacity="0.55"
      />

      <text
        x="32"
        y="44"
        fill={ink}
        fillOpacity="0.6"
        fontFamily="'Fira Code', monospace"
        fontSize="8"
        letterSpacing="2"
      >
        COLLECTIBLES KE
      </text>
      <text
        x="328"
        y="44"
        textAnchor="end"
        fill={accent}
        fillOpacity="0.8"
        fontFamily="'Fira Code', monospace"
        fontSize="8"
        letterSpacing="1.5"
      >
        {item.ref}
      </text>
      <path
        d="M32 56h296"
        stroke={ink}
        strokeOpacity="0.15"
        strokeDasharray="1 5"
      />

      <text
        x="32"
        y="420"
        fill={accent}
        fontFamily="'Fira Code', monospace"
        fontSize="8"
        letterSpacing="2"
      >
        {category.label.toUpperCase()}
      </text>
      <text
        x="328"
        y="420"
        textAnchor="end"
        fill={ink}
        fillOpacity="0.55"
        fontFamily="'Fira Code', monospace"
        fontSize="8"
        letterSpacing="2"
      >
        {item.year}
      </text>
      <text
        x="180"
        y="420"
        textAnchor="middle"
        fill={ink}
        fillOpacity="0.35"
        fontFamily="'Fira Code', monospace"
        fontSize="7"
        letterSpacing="2"
      >
        ARCHIVE PLATE {String(item.variant).padStart(2, '0')}
      </text>
    </svg>
  )
}
