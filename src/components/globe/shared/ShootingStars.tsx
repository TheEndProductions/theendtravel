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
  const quat = useMemo(() => new THREE.Quaternion(), []);
  const up = useMemo(() => new THREE.Vector3(0, 1, 0), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsed.current += delta;

    const children = groupRef.current.children as THREE.Mesh[];

    if (elapsed.current >= nextSpawn.current) {
      const inactive = geometries.find((g) => !g.active);
      if (inactive && children[inactive.id]) {
        const mesh = children[inactive.id];

        // Direction: mostly downward-diagonal
        const xDir = 0.3 + Math.random() * 0.5;
        const yDir = -(0.6 + Math.random() * 0.4);
        inactive.dir.set(xDir, yDir, 0).normalize();

        // Start from upper-left area
        mesh.position.set(
          -4 - Math.random() * 3,
          3 + Math.random() * 3,
          -1 + Math.random() * 1
        );

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

          // Scale: thin and long
          const trailLength = 0.2 + fade * 0.3;
          const trailWidth = 0.008 + fade * 0.012;
          mesh.scale.set(trailWidth, trailWidth, trailLength);

          // Rotate to align Z-axis (box length) with direction
          quat.setFromUnitVectors(new THREE.Vector3(0, 0, 1), g.dir);
          mesh.quaternion.copy(quat);

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
