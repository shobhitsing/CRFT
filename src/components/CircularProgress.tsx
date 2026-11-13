import React from 'react';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showText?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 46,
  strokeWidth = 4,
  className = '',
  showText = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(100, Math.max(0, value));
  const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

  const strokeColor = clampedValue >= 85 ? '#12b76a' : '#d97706';
  const trackColor = '#eaeff5';

  const center = size / 2;

  const fontSize =
    size <= 34 ? 9.5 : size <= 44 ? 11 : size <= 50 ? 12 : size <= 56 ? 13 : 14;

  return (
    <div
      className={`circular-progress-wrap ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {clampedValue === 100 ? (
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
        ) : (
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            transform={`rotate(-90 ${center} ${center})`}
            style={{ transition: 'stroke-dashoffset 0.4s ease' }}
          />
        )}
        {showText && (
          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#182230"
            fontSize={fontSize}
            fontWeight="700"
            fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            letterSpacing="-0.2px"
          >
            {clampedValue}%
          </text>
        )}
      </svg>
    </div>
  );
};
