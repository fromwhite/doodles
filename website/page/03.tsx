import React, { useMemo, useRef, useState, Suspense } from 'react';
import {
  Line,
  useCursor,
  useGLTF,
  useAspect,
  useVideoTexture,
  useTexture,
  CameraShake,
} from '@react-three/drei';
import * as THREE from 'three';
import { extend, useThree, useFrame } from '@react-three/fiber';
import {
  EffectComposer,
  Glitch,
  Bloom,
  Noise,
  SMAA,
  DepthOfField,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { useControls, button } from 'leva';
import { BlendFunction, GlitchMode } from 'postprocessing';
import { View, Common } from '../adapter/View';
import { getURL } from '../compontent/helper';

export default function StarterWithDrei() {
  const [stream, setStream] = useState(new MediaStream());

  const videos = {
    H0XV10: getURL(`/doodles${'/H0XV-10.mp4'}`),
  };
  const animates = {
    none: '',
    bounce: 'animate-bounce',
    spin: 'animate-spin',
    scale: 'scale',
    translateX: 'translateX',
    translateY: 'translateY',
  };

  const { url, animate } = useControls({
    url: {
      value: videos['H0XV10'],
      options: videos,
    },
    animate: {
      value: animates['none'],
      options: animates,
    },
    effects: false,
    'getDisplayMedia (only new-window)': button(async (get) => {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setStream(mediaStream);
    }),
  });

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
        <div style={{ flex: '.5 1 ', paddingTop: '10px' }}>
          <h1>animate model and video hybrid</h1>
          <p>renderer through view component(gl.scissor)</p>
          <p>
            Both these scenes are tracking elements and scaling their WebGL
            meshes to fit
          </p>
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
              <Duck scale={1.5} position={[0, -1.6, 0]} />
              <Common color={'lightblue'} />
            </Suspense>
          </View>
        </div>
        <div style={{ display: 'flex', width: '100%', padding: '0 40px' }}>
          <div
            className="scale"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              className={'translateX'}
              style={{ width: '300px', height: '300px' }}
            >
              <Suspense fallback={null}>
                <Flash scale={2} position={[0, -1.6, 0]} />
                <Common color="orange" />
                <CameraShake intensity={2} />
              </Suspense>
            </View>
          </div>
          <div
            style={{
              flex: '1 1 0',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              alignItems: 'center',
              alignContent: 'flex-start',
              aspectRatio: 16 / 9,
            }}
            className={animate}
          >
            <View
              style={{ width: '100%', maxWidth: '690px', aspectRatio: 16 / 9 }}
            >
              <ViewVideoMaterial url={stream.active ? stream : url} />
            </View>
          </div>
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

export function Duck(props) {
  const { scene } = useGLTF(getURL(`/doodles${'/duck.glb'}`));
  useFrame((state, delta) => (scene.rotation.y += delta));
  return <primitive object={scene} {...props} />;
}

export function Flash(props) {
  const { scene } = useGLTF(getURL(`/doodles${'/flash.gltf'}`));
  useFrame((state, delta) => (scene.rotation.y += delta));
  return <primitive object={scene} {...props} />;
}

/**
 * Inspired by r3f drei Video textures
 * here guy's https://codesandbox.io/u/drcmda for more details in the origin code
 * inspiration,template,model and video
 *
 * I am trying to do some effects on videoTexture based on the guy's
 */
export function ViewVideoMaterial({ url, muted = false }) {
  const size = useAspect(1800, 1000);
  // const [hovered, hover] = useState(false);
  // useCursor(hovered, 'pointer');

  return (
    <mesh
      scale={size}
      // onPointerOver={() => hover(true)}
      // onPointerOut={() => hover(false)}
    >
      <planeGeometry />
      <Suspense
        fallback={
          <FallbackMaterial url={getURL(`/doodles${'/b3RZ-10-Medium.jpeg'}`)} />
        }
      >
        <VideoMaterial url={url} props={{ muted: muted }} />
      </Suspense>
    </mesh>
  );
}

function VideoMaterial({ url, props }) {
  const texture = useVideoTexture(url, props);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

function FallbackMaterial({ url }) {
  const texture = useTexture(url) as any;
  return texture ? (
    <meshBasicMaterial map={texture} toneMapped={false} />
  ) : null;
}

/**
 * todo
 * @issue
 * https://github.com/pmndrs/drei/issues/1413
 */
function Effects() {
  const composer = useRef<any>();
  const glitch = useRef<any>();
  const { scene, gl, size, camera, viewport } = useThree();
  const aspect = viewport.factor;

  return (
    <Suspense fallback={null}>
      <EffectComposer multisampling={0}>
        {/* <Glitch
          delay={new THREE.Vector2(1.5, 3.5)}
          duration={new THREE.Vector2(0.1, 0.2)}
          strength={new THREE.Vector2(0.05, 0.1)}
          mode={GlitchMode.SPORADIC}
          active
          ratio={0.5}
        /> */}
        <SMAA />
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Noise
          opacity={0.1}
          premultiply={false}
          blendFunction={BlendFunction.NORMAL}
        />
        <Bloom
          intensity={0.5}
          luminanceSmoothing={0.025}
          luminanceThreshold={0.8}
        />
      </EffectComposer>
    </Suspense>
  );
}
