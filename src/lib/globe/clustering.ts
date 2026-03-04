import Supercluster from 'supercluster';
import type { GlobePin } from '@/types/globe';

export interface ClusterFeature {
  type: 'cluster';
  id: number;
  latitude: number;
  longitude: number;
  count: number;
  expansionZoom: number;
}

export interface PinFeature {
  type: 'pin';
  pin: GlobePin;
}

export type MapFeature = ClusterFeature | PinFeature;

export function createClusterIndex(pins: GlobePin[]) {
  const index = new Supercluster({ radius: 40, maxZoom: 12 });
  const points = pins.map((p) => ({
    type: 'Feature' as const,
    properties: { pin: p },
    geometry: { type: 'Point' as const, coordinates: [p.longitude, p.latitude] },
  }));
  index.load(points);
  return index;
}

export function cameraDistanceToZoom(distance: number): number {
  const minDist = 1.5, maxDist = 4.0;
  const clamped = Math.max(minDist, Math.min(maxDist, distance));
  const t = 1 - (clamped - minDist) / (maxDist - minDist);
  return Math.round(t * 12);
}

export function getFeatures(index: Supercluster, zoom: number): MapFeature[] {
  const raw = index.getClusters([-180, -85, 180, 85], zoom);
  return raw.map((f: any) => {
    if (f.properties.cluster) {
      return { type: 'cluster', id: f.properties.cluster_id, latitude: f.geometry.coordinates[1], longitude: f.geometry.coordinates[0], count: f.properties.point_count, expansionZoom: index.getClusterExpansionZoom(f.properties.cluster_id) };
    }
    return { type: 'pin', pin: f.properties.pin };
  });
}
