'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EarthProps { lowRes?: boolean; opacity?: number; }

export default function Earth({ lowRes = false, opacity = 1 }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const segments = lowRes ? 48 : 64;

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        float fbm(vec2 p) {
          float val = 0.0;
          float amp = 0.5;
          float freq = 1.0;
          for (int i = 0; i < 6; i++) {
            val += amp * noise(p * freq);
            amp *= 0.5;
            freq *= 2.0;
          }
          return val;
        }

        void main() {
          vec2 uv = vUv;
          float lat = (uv.y - 0.5) * 3.14159;
          float lon = (uv.x - 0.5) * 6.28318;

          vec2 nc = vec2(lon * 1.2, lat * 1.5);
          float landMass = fbm(nc * 1.8 + vec2(3.0, 1.5));

          float tropicalBand = 1.0 - smoothstep(0.0, 0.6, abs(lat));
          float polarMask = smoothstep(1.2, 1.5, abs(lat));
          float threshold = 0.42 + tropicalBand * 0.05 - polarMask * 0.15;

          // Coastline outline only
          float edge = smoothstep(threshold - 0.02, threshold - 0.005, landMass)
                     * (1.0 - smoothstep(threshold + 0.005, threshold + 0.02, landMass));

          // Black base
          vec3 baseColor = vec3(0.02, 0.02, 0.02);

          // White continent outlines
          baseColor += vec3(0.85, 0.85, 0.85) * edge;

          // Subtle rim glow
          vec3 viewDir = normalize(-vPosition);
          float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
          rim = pow(rim, 4.0);
          baseColor += vec3(0.06, 0.08, 0.1) * rim;

          gl_FragColor = vec4(baseColor, 1.0);
        }
      `,
      transparent: opacity < 1,
      opacity: opacity,
    });
  }, [opacity]);

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
