import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Triangle } from '../adapter/tunnel';
import { useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  OrthographicCamera,
} from '@react-three/drei';

export default function PatternParticles() {
  const particlesRef = useRef<THREE.Points>(null!);

  const CustomGeometryParticles = (props) => {
    const { count } = props;
    const radius = 2;

    const points = useRef<THREE.Points>(null!);

    const particlesPosition = useMemo(() => {
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const distance = Math.sqrt(Math.random()) * radius;
        const theta = THREE.MathUtils.randFloatSpread(360);
        const phi = THREE.MathUtils.randFloatSpread(360);

        let x = distance * Math.sin(theta) * Math.cos(phi);
        let y = distance * Math.sin(theta) * Math.sin(phi);
        let z = distance * Math.cos(theta);

        positions.set([x, y, z], i * 3);
      }

      return positions;
    }, [count]);

    const uniforms = useMemo(
      () => ({
        uTime: {
          value: 0.0,
        },
        uRadius: {
          value: radius,
        },
      }),
      []
    );

    useFrame((state) => {
      const { clock } = state;

      (points.current.material as any).uniforms.uTime.value = clock.elapsedTime;
    });

    return (
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </points>
    );
  };

  return (
    <Triangle>
      {/* <PerspectiveCamera position={[2.0, 2.0, 2.0]} /> */}
      <ambientLight intensity={0.5} />
      <CustomGeometryParticles count={4000} />
      {/* <OrbitControls /> */}
    </Triangle>
  );
}

PatternParticles.description = `PatternParticles`;

/**
 * todo: custom fluid particle animation
 */

const vertexShader = `uniform float uTime;
uniform float uRadius;

// Source: https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d-y.glsl.js
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(
    c, 0.0, -s,
    0.0, 1.0, 0.0,
    s, 0.0, c
  );
}


void main() {
  float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
  vec3 particlePosition = position * rotation3dY(uTime * 0.3 * distanceFactor);

  vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  gl_PointSize = 3.0;
}`;

const fragmentShader = `void main() {
  gl_FragColor = vec4(0.34, 0.53, 0.96, 1.0);
}`;
