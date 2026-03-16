'use client';
import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface EarthProps { lowRes?: boolean; opacity?: number; }

export default function Earth({ lowRes = false, opacity = 1 }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const segments = lowRes ? 48 : 64;

  const nightMap = useLoader(THREE.TextureLoader, '/earth-night.jpg');
  const bumpMap = useLoader(THREE.TextureLoader, '/earth-bump.png');

  const material = useMemo(() => {
    nightMap.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({
      map: nightMap,
      bumpMap: bumpMap,
      bumpScale: 0.03,
      transparent: opacity < 1,
      opacity: opacity,
      emissiveMap: nightMap,
      emissive: new THREE.Color(0xffddaa),
      emissiveIntensity: 1.8,
    });
  }, [nightMap, bumpMap, opacity]);

  useFrame(() => {
    if (material) {
      material.opacity = opacity;
      material.transparent = opacity < 1;
    }
  });

  return (
    <mesh ref={meshRef} material={material}>
      <sphereGeometry args={[1, segments, segments]} />
    </mesh>
  );
}
