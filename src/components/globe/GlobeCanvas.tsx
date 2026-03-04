'use client';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Earth from './shared/Earth';
import Atmosphere from './shared/Atmosphere';
import MarkerLayer from './MarkerLayer';
import ArcLayer from './ArcLayer';
import CameraController from './CameraController';
import { useGlobe } from './GlobeProvider';

export default function GlobeCanvas() {
  const { filteredPins, pins } = useGlobe();

  return (
    <Canvas camera={{ position: [0, 0, 2.8], fov: 45 }} style={{ width: '100%', height: '100%' }} gl={{ antialias: true, alpha: true }}>
      <Stars radius={100} depth={50} count={2500} factor={6} saturation={0} fade speed={0.3} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 3, 5]} intensity={0.8} />
      <Earth />
      <Atmosphere />
      <MarkerLayer pins={filteredPins} />
      <ArcLayer pins={pins} />
      <CameraController />
    </Canvas>
  );
}
