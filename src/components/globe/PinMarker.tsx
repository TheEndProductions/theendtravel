'use client';
import * as THREE from 'three';
import { latLngToVector3 } from '@/lib/globe/coordinates';
import { CATEGORY_COLORS } from '@/lib/globe/constants';
import type { GlobePin } from '@/types/globe';

interface PinMarkerProps { pin: GlobePin; onClick: () => void; onHover: (h: boolean) => void; time: number; }

export default function PinMarker({ pin, onClick, onHover, time }: PinMarkerProps) {
  const pos = latLngToVector3(pin.latitude, pin.longitude, 0.01);
  const color = CATEGORY_COLORS[pin.category] || '#F5F2ED';
  const pulse = 1 + Math.sin(time * 2) * 0.15;

  return (
    <mesh
      position={pos}
      scale={[0.015 * pulse, 0.015 * pulse, 0.015 * pulse]}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={(e) => { e.stopPropagation(); onHover(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { onHover(false); document.body.style.cursor = 'default'; }}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}
