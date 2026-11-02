import { useId } from 'react'
import { getCategory } from '../data/catalog'

function ChairsMotif({ accent, ink, base, variant }) {
  const tilt = (variant - 2) * 2.5

  return (
    <g transform={`rotate(${tilt} 180 250)`}>
      <ellipse cx="180" cy="382" rx="88" ry="10" fill={ink} fillOpacity="0.07" />
      <path
        d="M180 372v-52M180 338l-70 28M180 338l70 28"
        fill="none"
        stroke={ink}
        strokeOpacity="0.35"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <g fill={accent} fillOpacity="0.75">
        <circle cx="110" cy="366" r="7" />
        <circle cx="142" cy="386" r="7" />
        <circle cx="218" cy="386" r="7" />
        <circle cx="250" cy="366" r="7" />
        <circle cx="180" cy="374" r="6" />
      </g>

      <rect
        x="108"
        y="250"
        width="144"
        height="58"
        rx="25"
        fill={accent}
      />
      <rect
        x="120"
        y="118"
        width="120"
        height="164"
        rx="40"
        fill={accent}
      />
      <rect
        x="136"
        y="134"
        width="88"
        height="132"
        rx="30"
        fill={base}
        stroke={ink}
        strokeOpacity="0.08"
      />
      <rect
        x="146"
        y="98"
        width="68"
        height="32"
        rx="16"
        fill={ink}
        fillOpacity="0.16"
      />
      <path
        d="M150 168c12-13 48-13 60 0M150 196c12-9 48-9 60 0"
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.65"
      />
      <rect
        x="92"
        y="252"
        width="26"
        height="18"
        rx="9"
        fill={ink}
        fillOpacity="0.22"
      />
      <rect
        x="242"
        y="252"
        width="26"
        height="18"
        rx="9"
        fill={ink}
        fillOpacity="0.22"
      />
      <path
        d="M126 272h108"
        stroke={ink}
        strokeOpacity="0.12"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  )
}

function GraphicsCardMotif({ accent, ink, base }) {
  const fans = [132, 228]

  return (
    <g>
      <rect
        x="54"
        y="190"
        width="252"
        height="104"
        rx="18"
        fill={base}
        stroke={accent}
        strokeWidth="3"
      />
      <rect
        x="68"
        y="204"
        width="224"
        height="76"
        rx="12"
        fill="#ffffff"
        fillOpacity="0.45"
      />

      {fans.map((cx) => (
        <g key={cx}>
          <circle
            cx={cx}
            cy="242"
            r="30"
            fill="none"
            stroke={accent}
            strokeWidth="3.5"
          />
          <circle cx={cx} cy="242" r="7" fill={accent} fillOpacity="0.8" />
          {[0, 72, 144, 216, 288].map((angle) => (
            <path
              key={angle}
              d={`M${cx} 242c8-12 20-16 26-10`}
              fill="none"
              stroke={accent}
              strokeWidth="3"
              strokeLinecap="round"
              strokeOpacity="0.55"
              transform={`rotate(${angle} ${cx} 242)`}
            />
          ))}
        </g>
      ))}

      <rect
        x="78"
        y="294"
        width="184"
        height="12"
        rx="5"
        fill={accent}
        fillOpacity="0.5"
      />
      <rect x="48" y="218" width="10" height="52" rx="5" fill={accent} />
      <circle cx="280" cy="214" r="3" fill={ink} fillOpacity="0.25" />
      <circle cx="280" cy="270" r="3" fill={ink} fillOpacity="0.25" />
      <text
        x="180"
        y="216"
        textAnchor="middle"
        fill={accent}
        fontFamily="'DM Mono', monospace"
        fontSize="10"
        letterSpacing="2"
        fillOpacity="0.8"
      >
        GPU
      </text>
    </g>
  )
}

function MacsMotif({ accent, ink, base }) {
  return (
    <g>
      <rect
        x="90"
        y="134"
        width="180"
        height="126"
        rx="14"
        fill={accent}
      />
      <rect
        x="102"
        y="146"
        width="156"
        height="102"
        rx="7"
        fill={base}
      />
      <circle cx="180" cy="252" r="2.5" fill={ink} fillOpacity="0.3" />
      <text
        x="180"
        y="210"
        textAnchor="middle"
        fill={accent}
        fontFamily="'Baloo 2', sans-serif"
        fontWeight="700"
        fontSize="34"
      >
        M4
      </text>
      <path
        d="M72 264h216l18 32H54l18-32Z"
        fill={base}
        stroke={accent}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M88 280h184"
        stroke={accent}
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="4 5"
      />
      <rect
        x="158"
        y="288"
        width="44"
        height="6"
        rx="3"
        fill={ink}
        fillOpacity="0.14"
      />
      <circle
        cx="180"
        cy="146"
        r="2"
        fill={accent}
        fillOpacity="0.55"
      />
    </g>
  )
}

function WordlistsMotif({ accent, ink, variant }) {
  const tilt = variant === 2 ? -3 : 2
  const badge = variant === 2 ? '1M' : '10M'
  const lineWidths = [116, 96, 108, 84, 102, 72]

  return (
    <g>
      <g transform={`rotate(${tilt} 180 238)`}>
        <rect
          x="112"
          y="136"
          width="152"
          height="202"
          rx="18"
          fill={accent}
          fillOpacity="0.16"
        />
        <rect
          x="98"
          y="122"
          width="152"
          height="202"
          rx="18"
          fill="#ffffff"
          stroke={accent}
          strokeWidth="3"
        />
        <rect
          x="116"
          y="142"
          width="72"
          height="14"
          rx="7"
          fill={accent}
        />
        {lineWidths.map((width, index) => (
          <rect
            key={index}
            x="116"
            y={176 + index * 18}
            width={width}
            height="7"
            rx="3.5"
            fill={ink}
            fillOpacity="0.18"
          />
        ))}
        <rect
          x="116"
          y="288"
          width="46"
          height="22"
          rx="11"
          fill={accent}
          fillOpacity="0.14"
        />
        <text
          x="139"
          y="303"
          textAnchor="middle"
          fill={accent}
          fontFamily="'DM Mono', monospace"
          fontSize="10"
        >
          CSV
        </text>
        <rect
          x="170"
          y="288"
          width="46"
          height="22"
          rx="11"
          fill={accent}
          fillOpacity="0.14"
        />
        <text
          x="193"
          y="303"
          textAnchor="middle"
          fill={accent}
          fontFamily="'DM Mono', monospace"
          fontSize="10"
        >
          TXT
        </text>
      </g>

      <circle cx="260" cy="156" r="36" fill={accent} />
      <text
        x="260"
        y="163"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="'Baloo 2', sans-serif"
        fontWeight="700"
        fontSize="22"
      >
        {badge}
      </text>
    </g>
  )
}

function GearMotif({ accent, ink, base }) {
  return (
    <g>
      <rect
        x="54"
        y="286"
        width="252"
        height="102"
        rx="24"
        fill={base}
        stroke={accent}
        strokeWidth="2.5"
        strokeDasharray="7 6"
        strokeOpacity="0.7"
      />
      <path
        d="M144 298c0-64 14-96 36-96s36 32 36 96c0 20-16 32-36 32s-36-12-36-32Z"
        fill="#ffffff"
        stroke={accent}
        strokeWidth="3"
      />
      <path
        d="M180 202v30"
        stroke={accent}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M144 298h72"
        stroke={accent}
        strokeOpacity="0.4"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M160 232h-8M208 232h-8"
        stroke={ink}
        strokeOpacity="0.2"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="248"
        cy="318"
        r="8"
        fill={accent}
        fillOpacity="0.2"
      />
      <path
        d="M244 318h8M248 314v8"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  )
}

function Motif({ category, ...props }) {
  if (category === 'chairs') return <ChairsMotif {...props} />
  if (category === 'gpus') return <GraphicsCardMotif {...props} />
  if (category === 'macs') return <MacsMotif {...props} />
  if (category === 'wordlists') return <WordlistsMotif {...props} />
  return <GearMotif {...props} />
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
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor={base} />
          <stop offset="100%" stopColor="#fffdf8" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.12" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`${uid}-grid`}
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M22 0H0v22"
            fill="none"
            stroke={ink}
            strokeOpacity="0.05"
          />
        </pattern>
      </defs>

      <rect width="360" height="460" fill={`url(#${uid}-bg)`} />
      <circle cx="318" cy="76" r="124" fill={accent} fillOpacity="0.07" />
      <circle cx="36" cy="402" r="98" fill={accent} fillOpacity="0.05" />
      <rect width="360" height="460" fill={`url(#${uid}-grid)`} />
      <rect width="360" height="460" fill={`url(#${uid}-glow)`} />

      <text
        x="180"
        y="342"
        textAnchor="middle"
        fontFamily="'Baloo 2', sans-serif"
        fontWeight="700"
        fontSize="220"
        fill={ink}
        fillOpacity="0.035"
      >
        {initial}
      </text>

      <Motif
        category={item.category}
        accent={accent}
        ink={ink}
        base={base}
        variant={item.variant}
      />

      <rect
        x="16.5"
        y="16.5"
        width="327"
        height="427"
        rx="24"
        fill="none"
        stroke={ink}
        strokeOpacity="0.09"
      />

      <text
        x="34"
        y="46"
        fill={ink}
        fillOpacity="0.55"
        fontFamily="'Nunito', sans-serif"
        fontWeight="800"
        fontSize="11"
        letterSpacing="1.6"
      >
        COLLECTIBLES KE
      </text>
      <text
        x="326"
        y="46"
        textAnchor="end"
        fill={accent}
        fontFamily="'DM Mono', monospace"
        fontSize="11"
        letterSpacing="1.2"
      >
        {item.ref}
      </text>
      <path
        d="M34 58h292"
        stroke={ink}
        strokeOpacity="0.12"
        strokeDasharray="1 5"
      />

      <text
        x="34"
        y="420"
        fill={accent}
        fontFamily="'Nunito', sans-serif"
        fontWeight="800"
        fontSize="12"
        letterSpacing="1.4"
      >
        {category.label.toUpperCase()}
      </text>
      <text
        x="326"
        y="420"
        textAnchor="end"
        fill={ink}
        fillOpacity="0.5"
        fontFamily="'Nunito', sans-serif"
        fontWeight="700"
        fontSize="12"
        letterSpacing="1.2"
      >
        {item.year}
      </text>
      <text
        x="180"
        y="446"
        textAnchor="middle"
        fill={ink}
        fillOpacity="0.34"
        fontFamily="'DM Mono', monospace"
        fontSize="9"
        letterSpacing="1.8"
      >
        DEMO ITEM · NOT REAL STOCK
      </text>
    </svg>
  )
}
