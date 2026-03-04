const GLOBE_RADIUS = 1;
const DEG2RAD = Math.PI / 180;

export function latLngToVector3(lat: number, lng: number, altitude: number = 0): [number, number, number] {
  const phi = (90 - lat) * DEG2RAD;
  const theta = (lng + 180) * DEG2RAD;
  const r = GLOBE_RADIUS + altitude;
  return [-(r * Math.sin(phi) * Math.cos(theta)), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta)];
}

export function vector3ToLatLng(x: number, y: number, z: number): { lat: number; lng: number } {
  const r = Math.sqrt(x * x + y * y + z * z);
  const lat = 90 - Math.acos(y / r) / DEG2RAD;
  const lng = Math.atan2(z, -x) / DEG2RAD - 180;
  return { lat, lng: lng < -180 ? lng + 360 : lng };
}

export function greatCircleDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const dLat = (lat2 - lat1) * DEG2RAD;
  const dLng = (lng2 - lng1) * DEG2RAD;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * DEG2RAD) * Math.cos(lat2 * DEG2RAD) * Math.sin(dLng / 2) ** 2;
  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export { GLOBE_RADIUS };
