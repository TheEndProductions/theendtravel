'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import earthVertexShader from './shaders/earthVertex.glsl';
import earthFragmentShader from './shaders/earthFragment.glsl';

interface EarthProps { lowRes?: boolean; opacity?: number; }

export default function Earth({ lowRes = false, opacity = 1 }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const segments = lowRes ? 48 : 64;

  const uniforms = useMemo(() => ({
    elevationMap: { value: null },
    waterMask: { value: null },
    borderMap: { value: null },
    time: { value: 0 },
    landLow: { value: new THREE.Color('#0A0A0A') },
    landHigh: { value: new THREE.Color('#8B7355') },
    oceanDeep: { value: new THREE.Color('#050810') },
    oceanShallow: { value: new THREE.Color('#2A4B5E') },
    borderColor: { value: new THREE.Color('#3a3a3a') },
  }), []);

  useFrame((_, delta) => {
    if (uniforms.time) uniforms.time.value += delta;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, segments, segments]} />
      <shaderMaterial
        vertexShader={earthVertexShader}
        fragmentShader={earthFragmentShader}
        uniforms={uniforms}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
}
