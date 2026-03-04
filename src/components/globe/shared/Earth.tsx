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
    const canvas = document.createElement('canvas');
    canvas.width = texture.image.width;
    canvas.height = texture.image.height;
    const ctx = canvas.getContext('2d')!;

    ctx.drawImage(texture.image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const w = canvas.width;
    const h = canvas.height;

    // Step 1: Create a clean land mask based on brightness threshold
    // Ocean pixels in the dark earth texture are very dark blue/black
    // Land pixels are brighter
    const isLand = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) {
      const r = data[i * 4];
      const g = data[i * 4 + 1];
      const b = data[i * 4 + 2];
      const brightness = r * 0.299 + g * 0.587 + b * 0.114;
      // Land is anything above a low threshold
      isLand[i] = brightness > 18 ? 1 : 0;
    }

    // Step 2: Find coastline edges (land pixels adjacent to water)
    const edges = new Uint8Array(w * h);
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;
        if (isLand[idx] === 1) {
          // Check if any neighbor is water
          const hasWater =
            isLand[idx - 1] === 0 ||
            isLand[idx + 1] === 0 ||
            isLand[idx - w] === 0 ||
            isLand[idx + w] === 0 ||
            isLand[idx - w - 1] === 0 ||
            isLand[idx - w + 1] === 0 ||
            isLand[idx + w - 1] === 0 ||
            isLand[idx + w + 1] === 0;
          if (hasWater) edges[idx] = 1;
        }
      }
    }

    // Step 3: Thicken the edges slightly for crisp visibility
    const thickEdges = new Uint8Array(w * h);
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;
        if (edges[idx] === 1 ||
            edges[idx - 1] === 1 ||
            edges[idx + 1] === 1 ||
            edges[idx - w] === 1 ||
            edges[idx + w] === 1) {
          thickEdges[idx] = 1;
        }
      }
    }

    // Step 4: Render — pure black everywhere, white only on edges
    for (let i = 0; i < w * h; i++) {
      const pi = i * 4;
      if (thickEdges[i] === 1) {
        data[pi] = 220;
        data[pi + 1] = 220;
        data[pi + 2] = 220;
      } else {
        data[pi] = 5;
        data[pi + 1] = 5;
        data[pi + 2] = 5;
      }
      data[pi + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);

    const newTexture = new THREE.CanvasTexture(canvas);
    newTexture.colorSpace = THREE.SRGBColorSpace;

    return new THREE.MeshBasicMaterial({
      map: newTexture,
      transparent: opacity < 1,
      opacity: opacity,
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
