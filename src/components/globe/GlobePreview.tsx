'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import Earth from './shared/Earth';
import ShootingStars from './shared/ShootingStars';
import Atmosphere from './shared/Atmosphere';

function SpinningGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={groupRef}>
      <Earth lowRes />
    </group>
  );
}

export default function GlobePreview() {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} style={{ width: '100%', height: '100%', borderRadius: '12px' }} gl={{ antialias: true, alpha: true }}>
      <Stars radius={100} depth={50} count={1500} factor={5} saturation={0} fade speed={0.3} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} />
      <SpinningGlobe />
      <ShootingStars count={3} />
    </Canvas>
  );
}
