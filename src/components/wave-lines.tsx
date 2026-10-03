import { cx } from "./ui";

/**
 * Flowing horizontal lines echoing the bands in the QIC emblem.
 * Decorative only; colour comes from `currentColor`.
 */
export function WaveLines({
  lines = 10,
  amplitude = 16,
  strokeWidth = 1.25,
  className,
}: {
  lines?: number;
  amplitude?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const width = 1200;
  const height = 600;
  const gap = height / (lines + 1);

  const paths = Array.from({ length: lines }, (_, i) => {
    const y = gap * (i + 1);
    const a = amplitude * (0.55 + 0.45 * Math.sin(i * 1.3 + 0.4));
    const wavelength = 320 + (i % 3) * 70;
    const start = -((i * 97) % wavelength);
    let d = `M${start} ${y.toFixed(1)} q${wavelength / 4} ${(-a).toFixed(1)} ${wavelength / 2} 0`;
    for (let x = start + wavelength / 2; x < width + wavelength; x += wavelength / 2) {
      d += ` t${wavelength / 2} 0`;
    }
    return d;
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden
      className={cx("pointer-events-none", className)}
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
