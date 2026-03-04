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

    // Draw original texture
    ctx.drawImage(texture.image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convert to black with white edges
    const brightness = new Float32Array(canvas.width * canvas.height);
    for (let i = 0; i < brightness.length; i++) {
      brightness[i] = (data[i * 4] + data[i * 4 + 1] + data[i * 4 + 2]) / (255 * 3);
    }

    // Edge detection (Sobel-like)
    const w = canvas.width;
    const h = canvas.height;
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const idx = y * w + x;
        const gx = Math.abs(
          brightness[idx - 1] - brightness[idx + 1] +
          2 * (brightness[idx - w - 1] - brightness[idx - w + 1]) +
          brightness[idx + w - 1] - brightness[idx + w + 1]
        );
        const gy = Math.abs(
          brightness[idx - w] - brightness[idx + w] +
          2 * (brightness[idx - w - 1] - brightness[idx + w - 1]) +
          brightness[idx - w + 1] - brightness[idx + w + 1]
        );
        const edge = Math.min(1, (gx + gy) * 8);

        const pi = idx * 4;
        const val = Math.floor(edge * 200);
        data[pi] = val;
        data[pi + 1] = val;
        data[pi + 2] = val;
        data[pi + 3] = 255;
      }
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
