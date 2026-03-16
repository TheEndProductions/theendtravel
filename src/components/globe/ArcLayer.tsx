'use client';
import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import type { GlobePin } from '@/types/globe';
import { latLngToVector3, greatCircleDistance } from '@/lib/globe/coordinates';
import { CATEGORY_COLORS } from '@/lib/globe/constants';

interface ArcLayerProps { pins: GlobePin[]; }

export default function ArcLayer({ pins }: ArcLayerProps) {
  const arcs = useMemo(() => {
    const pinMap = new Map(pins.map((p) => [p.id, p]));
    return pins
      .filter((p) => p.connectedToId && pinMap.has(p.connectedToId))
      .map((p) => ({ from: p, to: pinMap.get(p.connectedToId!)! }));
  }, [pins]);

  return (
    <group>
      {arcs.map(({ from, to }) => {
        const start = new THREE.Vector3(...latLngToVector3(from.latitude, from.longitude, 0.02));
        const end = new THREE.Vector3(...latLngToVector3(to.latitude, to.longitude, 0.02));
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const dist = greatCircleDistance(from.latitude, from.longitude, to.latitude, to.longitude);
        const arcHeight = 1 + Math.max(dist * 0.5, 0.15);
        mid.normalize().multiplyScalar(arcHeight);

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(64);
        const color = CATEGORY_COLORS[from.category] || '#8B7355';

        return (
          <Line key={`${from.id}-${to.id}`} points={points} color={color} lineWidth={1.5} transparent opacity={0.6} />
        );
      })}
    </group>
  );
}
