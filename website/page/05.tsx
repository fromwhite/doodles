import React, { useRef, useContext, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Triangle } from '../adapter/tunnel';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls, folder } from 'leva';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { CameraHelper, DirectionalLight } from 'three';
import {
  EffectInstance,
  Effekseer,
  effekseerManager,
  EffekseerManager,
  EffekseerReactContext,
  Effekt,
} from '../../src/adapter';

import blockUrl from '../../Resources/block.efk?url';
import laser1Url from '../../Resources/Laser01.efk?url';
import laser2Url from '../../Resources/Laser02.efk?url';

effekseerManager.preloadEffect('Laser01', laser1Url);

export default function PatternEffekseer() {
  const { color, position, rotation, scale } = useControls('Background', {
    color: '#d4d4d4',
    position: {
      value: [0, 0, 0],
      step: 0.1,
    },
    rotation: {
      value: [0, 0, 0],
      step: 0.1,
    },
    scale: {
      value: [1, 1, 1],
      step: 0.1,
    },
  });

  const managerRef = useRef<EffekseerManager>(null);

  const blockRef = useRef<EffectInstance>(null!);
  // @ts-ignore
  window.blockRef = blockRef;

  const laserRef = useRef<EffectInstance>(null!);
  // @ts-ignore
  window.laserRef = laserRef;

  const laser2Ref = useRef<EffectInstance>(null!);
  // @ts-ignore
  window.laser2Ref = laser2Ref;

  return (
    <Triangle>
      <PerspectiveCamera
        makeDefault
        position={[-10, 20, 10]}
        fov={90}
        aspect={window.innerWidth / window.innerHeight}
      />
      <Effekseer ref={managerRef}>
        <color attach="background" args={[color]} />
        <directionalLight
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
          shadow-camera-far={130}
          shadow-camera-near={60}
          shadow-camera-left={-40}
          shadow-camera-right={40}
          shadow-camera-top={40}
          shadow-camera-bottom={-40}
        />

        <>
          <mesh
            position={[-5, 0, 0]}
            castShadow={true}
            receiveShadow={true}
            onClick={async () => {
              const p = laser2Ref.current?.play();
              await p;
              console.log('%ceffect finished', 'color: limegreen');
            }}
          >
            <sphereGeometry />
            <meshStandardMaterial color="orange" emissiveIntensity={5} />

            <Suspense fallback={null}>
              <Effekt
                ref={laser2Ref}
                name={'Laser02'}
                src={laser2Url}
                debug={true}
                dispose={null}
                rotation={rotation}
                position={position}
                scale={[0.5, 0.5, 0.5]}
                speed={1}
              />
            </Suspense>
          </mesh>

          <mesh
            position={[0, 0, -12]}
            castShadow={true}
            receiveShadow={true}
            onClick={() => laserRef.current?.play()}
          >
            <sphereGeometry />
            <meshStandardMaterial color="hotpink" />

            <Suspense fallback={null}>
              <Effekt
                ref={laserRef}
                name={'Laser01'}
                src={laser1Url}
                debug={true}
                dispose={null}
                position={position}
                rotation={rotation}
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
          </mesh>

          <mesh
            position={[5, 1, 0]}
            scale={[10, 10, 10]}
            castShadow={true}
            receiveShadow={true}
            onClick={() => blockRef.current?.play()}
          >
            <boxGeometry />
            <meshStandardMaterial color="gray" />

            <Suspense fallback={null}>
              <Effekt
                ref={blockRef}
                name={'block'}
                src={blockUrl}
                playOnMount={true}
                debug
                position={position}
                rotation={rotation}
                scale={[0.1, 0.1, 0.1]}
              />
            </Suspense>
          </mesh>
        </>

        <OrbitControls />
        <SceneLights />
      </Effekseer>
      )
    </Triangle>
  );
}

PatternEffekseer.description = `PatternEffekseer`;

const SceneLights = () => {
  const directionalLightRef = useRef<DirectionalLight>(null);
  const scene = useThree((state) => state.scene);

  const {
    dl_enabled,
    dl_helper_enabled,
    dl_castShadow,
    dl_intensity,
    dl_position,
    dl_color,
    al_enabled,
    al_intensity,
    al_color,
    pl_enabled,
    pl_intensity,
    pl_position,
    pl_color,
    pl_castShadow,
  } = useControls(
    'Lights',
    {
      directionalLight: folder(
        {
          dl_enabled: true,
          dl_helper_enabled: false,
          dl_castShadow: true,
          dl_color: '#ffffff',
          dl_intensity: 1,
          dl_position: [17, 76, 68],
        },
        { collapsed: true }
      ),
      ambientLight: folder(
        {
          al_enabled: true,
          al_intensity: 0.1,
          al_color: '#ffffff',
        },
        { collapsed: true }
      ),
      pointLight: folder(
        {
          pl_enabled: false,
          pl_castShadow: true,
          pl_color: '#ffffff',
          pl_intensity: 1,
          pl_position: [10, 20, 10],
        },
        { collapsed: true }
      ),
    },
    { collapsed: true }
  );

  const { fogColor, fogNear, fogFar } = useControls(
    'Fog',
    {
      fogColor: { value: '#35306a', label: 'Fog Color' },
      fogNear: { value: 17, min: 0, max: 100, label: 'Fog Near' },
      fogFar: { value: 102, min: 0, max: 150, label: 'Fog Far' },
    },
    { collapsed: true }
  );

  // Add camera helper to debug directional light shadows
  useEffect(() => {
    if (directionalLightRef.current && dl_helper_enabled) {
      const shadowCameraHelper = new CameraHelper(
        directionalLightRef.current.shadow.camera
      );
      scene.add(shadowCameraHelper);
      return () => {
        scene.remove(shadowCameraHelper);
      };
    }
  }, [dl_helper_enabled]);

  return (
    <>
      {al_enabled && <ambientLight color={al_color} intensity={al_intensity} />}
      {dl_enabled && (
        <directionalLight
          ref={directionalLightRef}
          color={dl_color}
          position={dl_position}
          intensity={dl_intensity}
          castShadow={dl_castShadow}
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
          shadow-camera-far={130}
          shadow-camera-near={60}
          shadow-camera-left={-40}
          shadow-camera-right={40}
          shadow-camera-top={40}
          shadow-camera-bottom={-40}
        />
      )}
      {directionalLightRef.current && dl_helper_enabled && (
        <cameraHelper args={[directionalLightRef.current.shadow.camera]} />
      )}

      {pl_enabled && (
        <pointLight
          color={pl_color}
          position={pl_position}
          intensity={pl_intensity}
          castShadow={pl_castShadow}
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
        />
      )}

      <fog attach={'fog'} args={[fogColor, fogNear, fogFar]} />
    </>
  );
};
