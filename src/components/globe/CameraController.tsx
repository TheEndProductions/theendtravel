'use client';
import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useGlobe } from './GlobeProvider';
import { latLngToVector3 } from '@/lib/globe/coordinates';

export default function CameraController() {
  const { selectedPin, selectedClusterPins, setCameraZoom } = useGlobe();
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const [flyTarget, setFlyTarget] = useState<THREE.Vector3 | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);
  const entranceStart = useRef(Date.now());

  // Entrance animation: camera descends from space
  useFrame(() => {
    if (!entranceDone) {
      const elapsed = (Date.now() - entranceStart.current) / 1000;
      if (elapsed < 2) {
        const t = Math.min(elapsed / 2, 1);
        const eased = t * t * (3 - 2 * t);
        const dist = 8 - (8 - 2.8) * eased;
        camera.position.normalize().multiplyScalar(dist);
      } else {
        setEntranceDone(true);
      }
    }

    // Fly-to animation
    if (flyTarget && isFlying) {
      camera.position.lerp(flyTarget, 0.06);
      if (camera.position.distanceTo(flyTarget) < 0.05) {
        setFlyTarget(null);
        setIsFlying(false);
      }
    }

    // Report zoom level
    const dist = camera.position.length();
    setCameraZoom(dist);
  });

  // Fly to selected pin
  useEffect(() => {
    if (selectedPin) {
      const pos = latLngToVector3(selectedPin.latitude, selectedPin.longitude, 0);
      const dir = new THREE.Vector3(...pos).normalize();
      setFlyTarget(dir.multiplyScalar(2.2));
      setIsFlying(true);
    }
  }, [selectedPin]);

  // Fly to cluster center
  useEffect(() => {
    if (selectedClusterPins.length > 0) {
      const avgLat = selectedClusterPins.reduce((s, p) => s + p.latitude, 0) / selectedClusterPins.length;
      const avgLng = selectedClusterPins.reduce((s, p) => s + p.longitude, 0) / selectedClusterPins.length;
      const pos = latLngToVector3(avgLat, avgLng, 0);
      const dir = new THREE.Vector3(...pos).normalize();
      setFlyTarget(dir.multiplyScalar(2.0));
      setIsFlying(true);
    }
  }, [selectedClusterPins]);

  // Cancel fly on user interaction
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const cancelFly = () => {
      if (isFlying) {
        setFlyTarget(null);
        setIsFlying(false);
      }
    };
    controls.addEventListener('start', cancelFly);
    return () => controls.removeEventListener('start', cancelFly);
  }, [isFlying]);

  const isBusy = !!selectedPin || selectedClusterPins.length > 0;

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      enableRotate={entranceDone}
      autoRotate={entranceDone && !isBusy}
      autoRotateSpeed={0.3}
      minDistance={1.5}
      maxDistance={4.0}
      zoomSpeed={0.5}
      rotateSpeed={0.5}
    />
  );
}
