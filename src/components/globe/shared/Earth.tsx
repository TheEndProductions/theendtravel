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

          vec2 noiseCoord = vec2(lon * 1.2, lat * 1.5);
          float landMass = fbm(noiseCoord * 1.8 + vec2(3.0, 1.5));

          float tropicalBand = 1.0 - smoothstep(0.0, 0.6, abs(lat));
          float polarMask = smoothstep(1.2, 1.5, abs(lat));
          float threshold = 0.42 + tropicalBand * 0.05 - polarMask * 0.15;
          float isLand = smoothstep(threshold - 0.02, threshold + 0.02, landMass);

          float elevation = fbm(noiseCoord * 3.5 + vec2(7.0, 2.0));

          vec3 oceanDeep = vec3(0.024, 0.039, 0.063);
          vec3 oceanShallow = vec3(0.055, 0.11, 0.15);
          vec3 landLow = vec3(0.07, 0.06, 0.05);
          vec3 landMid = vec3(0.35, 0.29, 0.22);
          vec3 landHigh = vec3(0.55, 0.45, 0.33);
          vec3 snow = vec3(0.7, 0.68, 0.65);

          float oceanDepth = fbm(noiseCoord * 2.0 + vec2(5.0, 8.0));
          vec3 oceanColor = mix(oceanDeep, oceanShallow, oceanDepth * 0.4);

          vec3 landColor = mix(landLow, landMid, smoothstep(0.3, 0.5, elevation));
          landColor = mix(landColor, landHigh, smoothstep(0.5, 0.7, elevation));
          landColor = mix(landColor, snow, smoothstep(0.75, 0.85, elevation) * 0.4);

          float polar = smoothstep(1.1, 1.4, abs(lat));
          landColor = mix(landColor, snow * 0.6, polar);
          oceanColor = mix(oceanColor, vec3(0.15, 0.17, 0.2), polar * 0.5);

          vec3 baseColor = mix(oceanColor, landColor, isLand);

          float coastline = smoothstep(threshold - 0.015, threshold, landMass) * (1.0 - smoothstep(threshold, threshold + 0.015, landMass));
          baseColor += vec3(0.08, 0.1, 0.12) * coastline * 2.0;

          float gridLat = smoothstep(0.97, 1.0, abs(sin(lat * 6.0)));
          float gridLon = smoothstep(0.97, 1.0, abs(sin(lon * 6.0)));
          float grid = max(gridLat, gridLon) * 0.06;
          baseColor += vec3(grid);

          vec3 viewDir = normalize(-vPosition);
          float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
          rim = pow(rim, 3.5);
          baseColor += vec3(0.1, 0.18, 0.25) * rim;
          float atmosphere = pow(rim, 5.0) * 0.3;
          baseColor += vec3(0.16, 0.29, 0.37) * atmosphere;

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
