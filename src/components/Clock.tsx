
import React, { useEffect, useState } from "react";

interface ClockProps {
  cityName?: string;
  timeZone: string; // IANA timezone, e.g., "Europe/London"
  size?: number;
  showNumbers?: boolean;
  backgroundImage?: string;
}

const Clock: React.FC<ClockProps> = ({ cityName, timeZone, size = 187, showNumbers = true, backgroundImage }) => {
  const [time, setTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Get hours, minutes, seconds in the correct timezone
  const formatter = new Intl.DateTimeFormat("en-GB", { timeZone, hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
  const parts = formatter.formatToParts(time);
  const hours = Number(parts.find(p => p.type === "hour")?.value) % 12;
  const minutes = Number(parts.find(p => p.type === "minute")?.value);
  const seconds = Number(parts.find(p => p.type === "second")?.value);

  const center = size / 2;
  const radius = size / 2 - 10;

  // Calculate positions for clock numbers
  const numberPositions = () => {
    const numbers = [];
    for (let i = 1; i <= 12; i++) {
      const angle = ((i - 3) * Math.PI * 2) / 12;
      const x = center + radius * 0.8 * Math.cos(angle);
      const y = center + radius * 0.8 * Math.sin(angle);
      numbers.push(<text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize={size / 9} fontWeight="600" fill="white" stroke="black" strokeWidth={0.5}>{i}</text>);
    }
    return numbers;
  };

  // Generate clock hands
  const hand = (lengthRatio: number, width: number, angle: number, color: string) => {
    const angleRad = ((angle - 90) * Math.PI) / 180;
    const x2 = center + lengthRatio * radius * Math.cos(angleRad);
    const y2 = center + lengthRatio * radius * Math.sin(angleRad);
    return <line x1={center} y1={center} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" />;
  };

  const safeCityId = cityName?.replace(/\s+/g, "-"); // Safe ID for SVG pattern

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      {cityName && <div style={{ fontWeight: "bold", fontSize: size * 0.14, marginBottom: "8px", textAlign: "center" }}>{cityName}</div>}

      {/* Analog clock */}
      <svg width={size} height={size}>
        {backgroundImage && (
          <defs>
            <pattern id={`bg-${safeCityId}`} patternUnits="userSpaceOnUse" width={size} height={size}>
              <image href={backgroundImage} x="0" y="0" width={size} height={size} preserveAspectRatio="xMidYMid slice" />
            </pattern>
          </defs>
        )}
        <circle cx={center} cy={center} r={radius} fill={backgroundImage ? `url(#bg-${safeCityId})` : "white"} stroke="black" strokeWidth="2" />
        {showNumbers && numberPositions()}
        {hand(0.5, 4, (hours + minutes / 60) * 30, "black")} // hour hand
        {hand(0.7, 3, (minutes + seconds / 60) * 6, "black")} // minute hand
        {hand(0.9, 1, seconds * 6, "red")} // second hand
        <circle cx={center} cy={center} r={4} fill="black" />
      </svg>

      {/* Digital clock */}
      <div style={{ marginTop: "8px", fontFamily: "'Courier New', Courier, monospace", fontWeight: "bold", fontSize: size * 0.10, backgroundColor: "rgba(0,0,0,0.6)", color: "#cfd1cfff", padding: "4px 8px", borderRadius: "6px", minWidth: "80px", textAlign: "center" }}>
        {formatter.format(time)}
      </div>
    </div>
  );
};

export default Clock;
