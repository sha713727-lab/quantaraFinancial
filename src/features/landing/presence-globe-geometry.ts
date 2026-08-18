export type GlobeVec = readonly [number, number, number];
export type GeoCoord = readonly [number, number];

export const practiceMarkers = [
  { lat: 25.2048, lng: 55.2708 },
  { lat: 51.5074, lng: -0.1278 },
  { lat: 40.7128, lng: -74.006 },
] as const;

export const practiceArcs = [
  {
    from: [practiceMarkers[0].lat, practiceMarkers[0].lng] as const,
    to: [practiceMarkers[1].lat, practiceMarkers[1].lng] as const,
  },
  {
    from: [practiceMarkers[1].lat, practiceMarkers[1].lng] as const,
    to: [practiceMarkers[2].lat, practiceMarkers[2].lng] as const,
  },
  {
    from: [practiceMarkers[2].lat, practiceMarkers[2].lng] as const,
    to: [practiceMarkers[0].lat, practiceMarkers[0].lng] as const,
  },
] as const;

const LAND_RINGS: readonly (readonly GeoCoord[])[] = [
  [
    [-168, 72],
    [-141, 70],
    [-90, 74],
    [-60, 60],
    [-53, 47],
    [-66, 44],
    [-80, 25],
    [-97, 26],
    [-110, 23],
    [-125, 33],
    [-156, 20],
    [-168, 60],
  ],
  [
    [-80, 12],
    [-60, 8],
    [-35, 0],
    [-35, -8],
    [-40, -23],
    [-52, -35],
    [-68, -56],
    [-76, -48],
    [-81, -5],
  ],
  [
    [-73, 78],
    [-20, 82],
    [-12, 70],
    [-45, 60],
    [-70, 68],
  ],
  [
    [-10, 36],
    [-10, 59],
    [5, 62],
    [28, 71],
    [40, 60],
    [29, 41],
    [12, 36],
  ],
  [
    [-17, 32],
    [12, 37],
    [32, 32],
    [44, 13],
    [60, 26],
    [57, 14],
    [51, 12],
    [43, -12],
    [40, -35],
    [18, -35],
    [11, -18],
    [-5, 5],
    [-17, 15],
  ],
  [
    [43, -12],
    [50, -12],
    [47, -26],
    [43, -25],
  ],
  [
    [27, 41],
    [40, 68],
    [90, 75],
    [180, 68],
    [146, 42],
    [142, 31],
    [100, 6],
    [78, 8],
    [60, 25],
    [44, 13],
    [32, 32],
  ],
  [
    [113, -11],
    [153, -12],
    [153, -39],
    [115, -35],
  ],
];

export function latLngToXyz(
  lat: number,
  lng: number,
  radius: number,
): GlobeVec {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

export function rotateX(
  x: number,
  y: number,
  z: number,
  angle: number,
): GlobeVec {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x, y * cos - z * sin, y * sin + z * cos];
}

export function rotateY(
  x: number,
  y: number,
  z: number,
  angle: number,
): GlobeVec {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos + z * sin, y, -x * sin + z * cos];
}

export function project(
  x: number,
  y: number,
  z: number,
  cx: number,
  cy: number,
  fov: number,
): GlobeVec {
  const scale = fov / (fov + z);
  return [x * scale + cx, y * scale + cy, z];
}

function pointInRing(
  lng: number,
  lat: number,
  ring: readonly GeoCoord[],
): boolean {
  const lastIndex = ring.length - 1;
  if (lastIndex < 2) {
    return false;
  }

  let inside = false;
  let j = lastIndex;

  for (let i = 0; i < ring.length; i += 1) {
    const current = ring[i];
    const previous = ring[j];
    if (current === undefined || previous === undefined) {
      j = i;
      continue;
    }

    const [xi, yi] = current;
    const [xj, yj] = previous;
    const intersects =
      yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;

    if (intersects) {
      inside = !inside;
    }

    j = i;
  }

  return inside;
}

export function isLand(lat: number, lng: number): boolean {
  return LAND_RINGS.some((ring) => pointInRing(lng, lat, ring));
}

export function createLandDots(sampleCount: number): readonly GlobeVec[] {
  const dots: GlobeVec[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < sampleCount; i += 1) {
    const y = 1 - ((i + 0.5) / sampleCount) * 2;
    const theta = goldenAngle * i;
    const lat = (Math.asin(Math.min(1, Math.max(-1, y))) * 180) / Math.PI;
    const lngRaw = (theta * 180) / Math.PI;
    const lng = ((((lngRaw + 180) % 360) + 360) % 360) - 180;

    if (isLand(lat, lng)) {
      dots.push(latLngToXyz(lat, lng, 1));
    }
  }

  return dots;
}
