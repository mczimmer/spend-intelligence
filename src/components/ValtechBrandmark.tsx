interface BrandmarkProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export default function ValtechBrandmark({ size = 20, color = "currentColor", style }: BrandmarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <polygon
          key={angle}
          points="50,8 46.5,42 50,45 53.5,42"
          fill={color}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="5" fill={color} />
      <circle cx="50" cy="50" r="2.5" fill="transparent" />
    </svg>
  );
}
