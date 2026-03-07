'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ShootingStars({ count = 5 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const geometries = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      active: false,
      life: 0,
      maxLife: 0,
      speed: 0,
      dir: new THREE.Vector3(),
    }));
  }, [count]);

  const nextSpawn = useRef(1);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsed.current += delta;

    const children = groupRef.current.children as THREE.Mesh[];

    if (elapsed.current >= nextSpawn.current) {
      const inactive = geometries.find((g) => !g.active);
      if (inactive && children[inactive.id]) {
        const mesh = children[inactive.id];

        // Random angle for the shooting direction (diagonal, mostly downward)
        const angle = (-Math.PI * 0.15) - Math.random() * Math.PI * 0.35; // -25 to -90 degrees
        const sideAngle = (Math.random() - 0.5) * 0.3; // slight z variation

        inactive.dir.set(
          Math.cos(angle),
          Math.sin(angle),
          sideAngle
        ).normalize();

        // Start from upper area, random position
        const startX = (Math.random() - 0.3) * 8;
        const startY = 3 + Math.random() * 3;
        const startZ = -1 + Math.random() * 1;
        mesh.position.set(startX, startY, startZ);

        inactive.speed = 10 + Math.random() * 8;
        inactive.life = 0;
        inactive.maxLife = 0.3 + Math.random() * 0.4;
        inactive.active = true;
      }
      nextSpawn.current = elapsed.current + 1.5 + Math.random() * 3;
    }

    geometries.forEach((g, i) => {
      const mesh = children[i];
      if (!mesh) return;

      if (g.active) {
        g.life += delta;
        if (g.life >= g.maxLife) {
          g.active = false;
          mesh.scale.set(0, 0, 0);
        } else {
          const progress = g.life / g.maxLife;
          const fade = progress < 0.1 ? progress / 0.1 : Math.max(0, 1 - (progress - 0.1) / 0.9);

          mesh.position.addScaledVector(g.dir, g.speed * delta);

          // Elongate trail in direction of travel
          const trailLength = 0.2 + fade * 0.3;
          const trailWidth = 0.008 + fade * 0.012;
          mesh.scale.set(trailLength, trailWidth, trailWidth);

          // Align mesh with travel direction
          const target = mesh.position.clone().add(g.dir);
          mesh.lookAt(target);

          const mat = mesh.material as THREE.MeshBasicMaterial;
          mat.opacity = fade * 0.9;
        }
      } else {
        mesh.scale.set(0, 0, 0);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {geometries.map((g) => (
        <mesh key={g.id} scale={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#F5F2ED" transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}
