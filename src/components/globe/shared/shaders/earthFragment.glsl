uniform sampler2D elevationMap;
uniform sampler2D waterMask;
uniform sampler2D borderMap;
uniform float time;

uniform vec3 landLow;
uniform vec3 landHigh;
uniform vec3 oceanDeep;
uniform vec3 oceanShallow;
uniform vec3 borderColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  float elev = texture2D(elevationMap, vUv).r;
  float water = texture2D(waterMask, vUv).r;
  float border = texture2D(borderMap, vUv).r;

  vec3 landColor = mix(landLow, landHigh, elev);
  vec3 oceanColor = mix(oceanDeep, oceanShallow, elev * 0.5);
  vec3 baseColor = mix(oceanColor, landColor, water);

  baseColor = mix(baseColor, borderColor, border * 0.4);

  vec3 viewDir = normalize(-vPosition);
  float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
  rim = pow(rim, 3.0);
  baseColor += vec3(0.08, 0.12, 0.18) * rim;

  float atmosphere = rim * 0.15;
  baseColor += vec3(0.16, 0.29, 0.37) * atmosphere;

  gl_FragColor = vec4(baseColor, 1.0);
}
