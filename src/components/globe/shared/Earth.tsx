'use client';
import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface EarthProps { lowRes?: boolean; opacity?: number; }

export default function Earth({ lowRes = false, opacity = 1 }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const segments = lowRes ? 48 : 64;

  const texture = useLoader(
    THREE.TextureLoader,
    'https://unpkg.com/three-globe@2.41.12/example/img/earth-dark.jpg'
  );

  const material = useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({
      map: texture,
      transparent: opacity < 1,
      opacity: opacity,
      emissiveMap: texture,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 1.8,
    });
  }, [texture, opacity]);

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
