import React, { useMemo, useRef, useState, Suspense } from 'react';
import { Line, useCursor } from '@react-three/drei';
import { View, Common } from '../adapter/View';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function StarterWithDrei() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: '.5 1 ' }}>
          <p>r3f drei view experiment</p>
          <p>not specific implementation, it's implemented by your own ideas</p>
        </div>
        <View
          className={'translateY'}
          style={{ width: '100px', height: '100px' }}
        >
          <Suspense fallback={null}>
            <Logo scale={0.6} position={[0, 0, 0]} />
            <color attach="background" args={['#efefef']} />
          </Suspense>
        </View>

        <div style={{ display: 'flex', width: '100%' }}>
          <View
            className={'translateX'}
            orbit
            style={{ width: '100px', height: '100px' }}
          >
            <Suspense fallback={null}>
              <Logo scale={0.6} position={[0, 0, 0]} />
              <Common color={'lightpink'} />
            </Suspense>
          </View>
        </div>
      </div>
    </>
  );
}

StarterWithDrei.description = `starter pro\n\ndrei`;

const Logo = ({ scale, ...props }) => {
  const mesh = useRef(null!);

  const [hovered, hover] = useState(false);
  const points = useMemo(
    () =>
      new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(
        100
      ),
    []
  );

  useCursor(hovered, 'pointer');
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    (mesh.current as any).rotation.y = Math.sin(t) * (Math.PI / 8);
    (mesh.current as any).rotation.x = Math.cos(t) * (Math.PI / 8);
    (mesh.current as any).rotation.z -= delta / 4;
  });

  return (
    <group ref={mesh} {...props}>
      <Line worldUnits points={points} color="#1fb2f5" lineWidth={0.15} />
      <Line
        worldUnits
        points={points}
        color="#1fb2f5"
        lineWidth={0.15}
        rotation={[0, 0, 1]}
      />
      <Line
        worldUnits
        points={points}
        color="#1fb2f5"
        lineWidth={0.15}
        rotation={[0, 0, -1]}
      />
      <mesh
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        onClick={() => window.open('https://github.com/pmndrs', '_blank')}
      >
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshBasicMaterial color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>
    </group>
  );
};
