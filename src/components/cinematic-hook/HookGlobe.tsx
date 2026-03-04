'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import Earth from '@/components/globe/shared/Earth';
import Atmosphere from '@/components/globe/shared/Atmosphere';
import { latLngToVector3 } from '@/lib/globe/coordinates';
import { MARKER_COLORS } from './hookConstants';
import { phaseOpacity } from './useHookTimeline';

const MARKERS = [
  [64.15, -21.94], [-13.53, -71.97], [31.63, -7.98], [35.01, 135.77],
  [38.72, -9.14], [-50.94, -73.41], [27.72, 85.32], [-1.29, 36.82],
  [23.14, -82.38], [42.65, 18.09], [17.07, -96.73], [19.88, 102.14],
] as const;

function RotatingGlobe({ elapsed }: { elapsed: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const globeOpacity = phaseOpacity(elapsed, 0.8, 2.0);
  useFrame((_, delta) => { if (groupRef.current) groupRef.current.rotation.y += delta * 0.06; });
  return (
    <group ref={groupRef}>
      <Earth lowRes opacity={globeOpacity} />
      <Atmosphere opacity={globeOpacity * 0.6} />
      {MARKERS.map(([lat, lng], i) => {
        const pos = latLngToVector3(lat, lng, 0.01);
        const delay = 2.0 + i * 0.12;
        const opacity = phaseOpacity(elapsed, delay, delay + 0.3, 7.0, 8.0);
        if (opacity <= 0) return null;
        return (
          <mesh key={i} position={pos} scale={[0.012, 0.012, 0.012]}>
            <sphereGeometry args={[1, 6, 6]} />
            <meshBasicMaterial color={MARKER_COLORS[i % MARKER_COLORS.length]} transparent opacity={opacity * 0.8} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function HookGlobe({ elapsed }: { elapsed: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }} style={{ position: 'absolute', inset: 0 }} gl={{ antialias: true, alpha: true }}>
      <Stars radius={100} depth={50} count={300} factor={4} saturation={0} fade speed={0.3} />
      <ambientLight intensity={0.12} />
      <directionalLight position={[5, 3, 5]} intensity={0.6} />
      <RotatingGlobe elapsed={elapsed} />
    </Canvas>
  );
}
