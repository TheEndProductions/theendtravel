'use client';
import { useMemo } from 'react';
import * as THREE from 'three';

interface AtmosphereProps { opacity?: number; }

export default function Atmosphere({ opacity = 1 }: AtmosphereProps) {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
          rim = pow(rim, 4.0);
          vec3 color = vec3(0.16, 0.29, 0.37);
          gl_FragColor = vec4(color, rim * 0.6 * uOpacity);
        }
      `,
      uniforms: { uOpacity: { value: opacity } },
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
    });
  }, [opacity]);

  return (
    <mesh scale={[1.08, 1.08, 1.08]} material={material}>
      <sphereGeometry args={[1, 48, 48]} />
    </mesh>
  );
}
