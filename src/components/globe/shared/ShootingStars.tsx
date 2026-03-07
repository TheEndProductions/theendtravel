'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Star {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  active: boolean;
}

export default function ShootingStars({ count = 3 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const nextSpawn = useRef(Math.random() * 3 + 1);
  const elapsed = useRef(0);

  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      life: 0,
      maxLife: 0,
      active: false,
    }));
  }, [count]);

  const spawnStar = (star: Star) => {
    const angle = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 8;
    const radius = 6 + Math.random() * 4;
    star.position.set(
      Math.cos(angle) * radius,
      y,
      Math.sin(angle) * radius
    );
    const speed = 3 + Math.random() * 4;
    const dir = new THREE.Vector3(
      -Math.cos(angle) + (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.3,
      -Math.sin(angle) + (Math.random() - 0.5) * 0.5
    ).normalize();
    star.velocity.copy(dir).multiplyScalar(speed);
    star.life = 0;
    star.maxLife = 0.4 + Math.random() * 0.6;
    star.active = true;
  };

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    elapsed.current += delta;

    if (elapsed.current >= nextSpawn.current) {
      const inactive = stars.find((s) => !s.active);
      if (inactive) spawnStar(inactive);
      nextSpawn.current = elapsed.current + 2 + Math.random() * 5;
    }

    stars.forEach((star, i) => {
      if (star.active) {
        star.life += delta;
        if (star.life >= star.maxLife) {
          star.active = false;
        } else {
          star.position.addScaledVector(star.velocity, delta);
        }
      }

      if (star.active) {
        const progress = star.life / star.maxLife;
        const fade = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;
        const scale = 0.02 + fade * 0.03;
        dummy.position.copy(star.position);
        dummy.scale.set(scale, scale, scale * 3);
        dummy.lookAt(star.position.clone().add(star.velocity));
      } else {
        dummy.position.set(0, 100, 0);
        dummy.scale.set(0, 0, 0);
      }
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#F5F2ED" transparent opacity={0.9} />
    </instancedMesh>
  );
}
