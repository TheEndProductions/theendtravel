'use client';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { GlobePin } from '@/types/globe';
import { useGlobe } from './GlobeProvider';
import { latLngToVector3 } from '@/lib/globe/coordinates';
import { createClusterIndex, cameraDistanceToZoom, getFeatures } from '@/lib/globe/clustering';
import { CATEGORY_COLORS } from '@/lib/globe/constants';

interface MarkerLayerProps { pins: GlobePin[]; }

export default function MarkerLayer({ pins }: MarkerLayerProps) {
  const { cameraZoom, selectPin, hoverPin } = useGlobe();
  const meshRefs = useRef<Record<string, THREE.InstancedMesh>>({});
  const timeRef = useRef(0);

  const clusterIndex = useMemo(() => createClusterIndex(pins), [pins]);
  const zoom = cameraDistanceToZoom(cameraZoom);
  const features = useMemo(() => getFeatures(clusterIndex, zoom), [clusterIndex, zoom]);

  const pinFeatures = features.filter((f) => f.type === 'pin');
  const clusterFeatures = features.filter((f) => f.type === 'cluster');

  useFrame((_, delta) => { timeRef.current += delta; });

  return (
    <group>
      {/* Individual pins */}
      {pinFeatures.map((f) => {
        if (f.type !== 'pin') return null;
        const pin = f.pin;
        const pos = latLngToVector3(pin.latitude, pin.longitude, 0.01);
        const color = CATEGORY_COLORS[pin.category] || '#F5F2ED';
        const pulse = 1 + Math.sin(timeRef.current * 2) * 0.15;

        return (
          <mesh
            key={pin.id}
            position={pos}
            scale={[0.015 * pulse, 0.015 * pulse, 0.015 * pulse]}
            onClick={(e) => { e.stopPropagation(); selectPin(pin); }}
            onPointerOver={(e) => { e.stopPropagation(); hoverPin(pin); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { hoverPin(null); document.body.style.cursor = 'default'; }}
          >
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.9} />
          </mesh>
        );
      })}

      {/* Clusters */}
      {clusterFeatures.map((f) => {
        if (f.type !== 'cluster') return null;
        const pos = latLngToVector3(f.latitude, f.longitude, 0.01);
        const size = 0.015 + Math.min(f.count / 80, 0.015);
        const pulse = 1 + Math.sin(timeRef.current * 1.5) * 0.1;

        return (
          <mesh
            key={`cluster-${f.id}`}
            position={pos}
            scale={[size * pulse, size * pulse, size * pulse]}
            onClick={(e) => { e.stopPropagation(); setCameraZoom(Math.max(cameraZoom - 0.5, 1.5)); }}
            onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { document.body.style.cursor = 'default'; }}
          >
            <sphereGeometry args={[1, 12, 12]} />
            <meshBasicMaterial color="#C4530A" transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
}
