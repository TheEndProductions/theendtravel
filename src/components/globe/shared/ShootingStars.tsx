'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ShootingStars({ count = 5 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const stars = useRef<{
    mesh: THREE.Mesh | null;
    active: boolean;
    life: number;
    maxLife: number;
    speed: number;
    dir: THREE.Vector3;
  }[]>([]);
  const nextSpawn = useRef(1);
  const elapsed = useRef(0);

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

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsed.current += delta;

    const children = groupRef.current.children as THREE.Mesh[];

    // Spawn new star
    if (elapsed.current >= nextSpawn.current) {
      const inactive = geometries.find((g) => !g.active);
      if (inactive && children[inactive.id]) {
        const mesh = children[inactive.id];
        // Start from a random edge position
        const side = Math.random() > 0.5 ? 1 : -1;
        const y = (Math.random() - 0.3) * 6;
        mesh.position.set(side * (4 + Math.random() * 3), y, -2 + Math.random() * 2);
        
        inactive.dir.set(-side * (0.8 + Math.random() * 0.4), -0.2 - Math.random() * 0.3, 0).normalize();
        inactive.speed = 8 + Math.random() * 6;
        inactive.life = 0;
        inactive.maxLife = 0.5 + Math.random() * 0.5;
        inactive.active = true;
      }
      nextSpawn.current = elapsed.current + 1.5 + Math.random() * 3;
    }

    // Update stars
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
          const fade = progress < 0.15 ? progress / 0.15 : Math.max(0, 1 - (progress - 0.15) / 0.85);
          
          mesh.position.addScaledVector(g.dir, g.speed * delta);
          
          // Elongate in direction of travel
          const length = 0.15 + fade * 0.25;
          const width = 0.01 + fade * 0.015;
          mesh.scale.set(length, width, width);
          mesh.lookAt(mesh.position.clone().add(g.dir));
          
          const mat = mesh.material as THREE.MeshBasicMaterial;
          mat.opacity = fade * 0.95;
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
