import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react';
import { createRoot } from 'react-dom/client';

import * as THREE from 'three';
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber';
import { Flex, Box, useFlexSize } from '@react-three/flex';
import { Loader, Line, useAspect, useCursor } from '@react-three/drei';
// import { useTransition, useSpring } from '@react-spring/core';
// import { a } from '@react-spring/three';
import { useLocation, Switch, Route, Redirect } from 'wouter';
import Postpro from './Postpro';
import Geo from './Geo';
import state from './state';
import { Text } from './Text';

function HeightReporter({ onReflow }: { onReflow: any }) {
  const size = useFlexSize();
  useLayoutEffect(() => onReflow && onReflow(...size), [onReflow, size]);
  return null;
}

function Page({
  text,
  tag,
  images,
  textScaleFactor,
  onReflow,
  left = false,
}: {
  text: any;
  tag: any;
  images: any;
  textScaleFactor: any;
  onReflow: any;
  left: boolean;
}) {
  const textures = useLoader(THREE.TextureLoader, images);
  const { viewport } = useThree();
  const boxProps = {
    centerAnchor: true,
    grow: 1,
    marginTop: 1,
    marginLeft: Number(left) * 1,
    marginRight: Number(!left) * 1,
    width: 'auto',
    height: 'auto',
    minWidth: 3,
    minHeight: 3,
    maxWidth: 6,
    maxHeight: 6,
  };
  return (
    <Box
      dir="column"
      align={left ? 'flex-start' : 'flex-end'}
      justify="flex-start"
      width="100%"
      height="auto"
      minHeight="100%"
    >
      <HeightReporter onReflow={onReflow} />
      <Box
        dir="row"
        width="100%"
        height="auto"
        justify={left ? 'flex-end' : 'flex-start'}
        margin={0}
        grow={1}
        wrap="wrap"
      >
        {(textures as THREE.Texture[]).map(
          (texture: THREE.Texture, index: number) => (
            <Box key={index} {...boxProps}>
              {(width, height) => (
                <mesh>
                  <planeGeometry args={[width, height]} />
                  <meshBasicMaterial map={texture} toneMapped={false} />
                </mesh>
              )}
            </Box>
          )
        )}
      </Box>
      <Box marginLeft={1.5} marginRight={1.5} marginTop={2}>
        <Text
          position={[left ? 1 : -1, 0.5, 1]}
          fontSize={textScaleFactor}
          lineHeight={1}
          letterSpacing={-0.05}
          maxWidth={(viewport.width / 4) * 3}
        >
          {tag}
          <meshBasicMaterial color="#cccccc" toneMapped={false} />
        </Text>
      </Box>
      <Box
        marginLeft={left ? 1.5 : 1}
        marginRight={left ? 1 : 1.5}
        marginBottom={1}
      >
        <Text
          // bold
          position-z={0.5}
          textAlign={left ? 'left' : 'right'}
          fontSize={1.5 * textScaleFactor}
          lineHeight={1}
          letterSpacing={-0.05}
          color="black"
          maxWidth={(viewport.width / 4) * 3}
        >
          {text}
        </Text>
      </Box>
    </Box>
  );
}

function Layercard({
  depth,
  boxWidth,
  boxHeight,
  text,
  textColor,
  color,
  map,
  textScaleFactor,
  threshold,
}: {
  depth: any;
  boxWidth: any;
  boxHeight: any;
  text: any;
  textColor: any;
  color: any;
  map: any;
  textScaleFactor: any;
  threshold: any;
}) {
  const ref = useRef<THREE.MeshBasicMaterial>(null!);
  const { viewport, size } = useThree();
  const pageLerp = useRef(state.top / size.height);
  useFrame(() => {
    const page = (pageLerp.current = THREE.MathUtils.lerp(
      pageLerp.current,
      state.top / size.height,
      0.15
    ));
    if (depth >= 0)
      ref.current.opacity =
        page < threshold * 1.7 ? 1 : 1 - (page - threshold * 1.7);
  });
  return (
    <>
      <mesh position={[boxWidth / 2, -boxHeight / 2, depth]}>
        <planeGeometry args={[boxWidth, boxHeight]} />
        <meshBasicMaterial
          ref={ref}
          color={color}
          map={map}
          toneMapped={false}
          transparent
          opacity={1}
        />
      </mesh>
      <Text
        position={[boxWidth / 2, -boxHeight / 2, depth + 1.5]}
        maxWidth={(viewport.width / 4) * 1}
        anchorX="center"
        anchorY="middle"
        fontSize={0.6 * textScaleFactor}
        lineHeight={1}
        letterSpacing={-0.05}
        color={textColor}
      >
        {text}
      </Text>
    </>
  );
}

function Content({
  onReflow,
  No,
  list,
}: {
  onReflow: any;
  No: any;
  list: any;
}) {
  const item =
    list.find((value) => {
      if (value.No == No) return value;
    }) || state.empty;

  const group = useRef<THREE.Group>(null!);
  const { viewport, size } = useThree();
  const [bW, bH] = useAspect(1920, 1920, 0.5);
  const texture = useLoader(THREE.TextureLoader, item.depthbox[0].image);
  const vec = new THREE.Vector3();
  const pageLerp = useRef(state.top / size.height);
  useFrame(() => {
    const page = (pageLerp.current = THREE.MathUtils.lerp(
      pageLerp.current,
      state.top / size.height,
      0.15
    ));
    const y = page * viewport.height;
    const sticky = item.threshold * viewport.height;
    group.current.position.lerp(
      vec.set(
        0,
        page < item.threshold ? y : sticky,
        page < item.threshold ? 0 : page * 1.25
      ),
      0.15
    );
  });
  const handleReflow = useCallback(
    (w: any, h: any) => onReflow((item.pages = h / viewport.height + 5.5)),
    [onReflow, viewport.height]
  );
  const sizesRef = useRef<THREE.Group[]>([]!);
  const scale = Math.min(1, viewport.width / 16);
  return (
    <group ref={group}>
      <Flex
        dir="column"
        position={[-viewport.width / 2, viewport.height / 2, 0]}
        size={[viewport.width, viewport.height, 0]}
        onReflow={handleReflow}
      >
        {item.content.map((props: any, index: number) => (
          <Page
            key={index}
            left={!(index % 2)}
            textScaleFactor={scale}
            onReflow={(w: any, h: any) => {
              sizesRef!.current[index] = h;
              item.threshold = Math.max(
                4,
                (4 / (15.8 * 3)) *
                  sizesRef.current.reduce((acc: any, e) => acc + e, 0)
              );
            }}
            {...props}
          />
        ))}
        <Box
          dir="row"
          width="100%"
          height="100%"
          align="center"
          justify="center"
        >
          <Box centerAnchor>
            {item.lines.map((props, index) => (
              <Line key={index} {...props} />
            ))}
            <Text
              // bold
              position-z={0.5}
              anchorX="center"
              anchorY="middle"
              fontSize={1.5 * scale}
              lineHeight={1}
              letterSpacing={-0.05}
              color="black"
              maxWidth={(viewport.width / 4) * 3}
            >
              {item.depthbox[0].text}
            </Text>
          </Box>
        </Box>
        <Box
          dir="row"
          width="100%"
          height="100%"
          align="center"
          justify="center"
        >
          <Box>
            <Layercard
              {...item.depthbox[0]}
              text={item.depthbox[1].text}
              boxWidth={bW}
              boxHeight={bH}
              map={texture}
              textScaleFactor={scale}
              threshold={item.threshold}
            />
            <Geo position={[bW / 2, -bH / 2, item.depthbox[1].depth]} />
          </Box>
        </Box>
      </Flex>
    </group>
  );
}

function List({ onChangePages, list }) {
  const [location, navigate] = useLocation();
  const group = useRef<THREE.Group>(null!);
  const { size } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height, 1);
  const vec = new THREE.Vector3();
  useFrame(() =>
    group.current.position.lerp(vec.set(0, state.top / 100, 0), 0.1)
  );
  const handleReflow = useCallback(
    (w: number, h: number) => {
      onChangePages(h / vpHeight);
    },
    [onChangePages, vpHeight]
  );

  const [hovered, set] = useState(false);
  useCursor(hovered, 'pointer');

  const cellWidth = (vpWidth - 18 * 2 * 0.05) / 18,
    cellHeight = (vpHeight - 6 * 2 * 0.05) / 6;
  const font = '/DotGothic16-Regular.ttf';

  return (
    <group ref={group}>
      <Flex
        flexDirection="column"
        align="center"
        justify="space-around"
        size={[vpWidth, vpHeight, 0]}
        onReflow={handleReflow}
        position={[-vpWidth / 2, vpHeight / 2, 0]}
      >
        {size.width / size.height < 16 / 10.9 ? (
          <Box margin={0.05}>
            <Text
              font={font}
              fontSize={0.3}
              letterSpacing={0.1}
              textAlign="center"
            >
              Please rotate your device
              <meshBasicMaterial color="#000" toneMapped={false} />
            </Text>
          </Box>
        ) : (
          <Box
            flexDirection="row"
            alignItems="center"
            justify="space-around"
            flexWrap="wrap"
            width="100%"
            flexGrow={1}
          >
            {list.map((k, i) => (
              <Box
                margin={0.05}
                align="center"
                justify="space-around"
                width={cellWidth * k.cell + 0.05 * 2 * (k.cell - 1.01)}
                key={i}
              >
                {() => {
                  switch (i) {
                    case 1:
                      return (
                        <Box margin={0.05}>
                          <Text
                            font={font}
                            fontSize={0.5}
                            letterSpacing={0.1}
                            textAlign="center"
                          >
                            POSTPROCESSING
                            <meshBasicMaterial
                              color="#000"
                              toneMapped={false}
                            />
                          </Text>
                        </Box>
                      );
                      break;

                    case 5:
                      return (
                        <Box margin={0.05}>
                          <Text font={font} fontSize={0.5} letterSpacing={0.1}>
                            Effects for React and @react-three/fiber
                            <meshStandardMaterial
                              color="#000"
                              toneMapped={false}
                            />
                          </Text>
                        </Box>
                      );
                      break;

                    case 15:
                      return (
                        <Box margin={0.05}>
                          <Text font={font} fontSize={0.5} letterSpacing={0.1}>
                            Busy work, slow updates
                            <meshStandardMaterial
                              color="#000"
                              toneMapped={false}
                            />
                          </Text>
                        </Box>
                      );
                      break;

                    default:
                      return (
                        <mesh
                          position={[
                            (cellWidth * k.cell + 0.05 * 2 * (k.cell - 1.01)) /
                              2,
                            -cellHeight / 2,
                            0,
                          ]}
                          onPointerOver={() => set(true)}
                          onPointerOut={() => set(false)}
                          onClick={() => {
                            navigate(`/doodles/post/${k.No}`);
                          }}
                        >
                          <planeGeometry
                            args={[
                              cellWidth * k.cell + 0.05 * 2 * (k.cell - 1.01),
                              cellHeight,
                            ]}
                          />
                          <Text
                            font={font}
                            fontSize={0.23}
                            letterSpacing={0.1}
                            maxWidth={0.9}
                            anchorX={0.5}
                            anchorY={-0.95}
                          >
                            {`Empty\n`}
                          </Text>
                          <meshStandardMaterial color={k.color} />
                        </mesh>
                      );
                      break;
                  }
                }}
              </Box>
            ))}
          </Box>
        )}
      </Flex>
    </group>
  );
}

function App() {
  const list = React.useMemo(() => state.list(), []);
  const scrollArea = useRef<any>(null!);
  const [location] = useLocation();
  const onScroll = (e: any) => (state.top = e.target?.scrollTop || 0);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  const [pages, setPages] = useState(0);
  return (
    <React.StrictMode>
      <Canvas
        shadows
        raycaster={{ enabled: false } as any}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], far: 1000 }}
        gl={{
          powerPreference: 'high-performance',
          alpha: false,
          antialias: false,
          stencil: false,
          depth: false,
        }}
        onCreated={({ gl }) => gl.setClearColor('#f5f5f5')}
      >
        {/* <pointLight position={[-10, -10, -10]} intensity={1} /> */}
        <ambientLight intensity={0.4} />
        {/* <spotLight
          castShadow
          angle={0.3}
          penumbra={1}
          position={[0, 10, 20]}
          intensity={5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        /> */}
        <Suspense fallback={null}>
          <Switch location={location}>
            <Route path="/doodles/">
              <List onChangePages={setPages} list={list} />
            </Route>
            <Route path="/doodles/post/:No">
              {(params) => (
                <Content onReflow={setPages} No={params.No} list={list} />
              )}
            </Route>
            <Redirect to="/doodles/" />
          </Switch>
          {/* <Content onReflow={setPages} No={2} list={list} /> */}
        </Suspense>
        {/* <Postpro /> */}
      </Canvas>
      {location && location.match(new RegExp(`/post/`)) ? (
        <div
          className="payload"
          ref={scrollArea}
          onScroll={onScroll}
          onPointerMove={(e) =>
            (state.mouse = [
              (e.clientX / window.innerWidth) * 2 - 1,
              (e.clientY / window.innerHeight) * 2 - 1,
            ])
          }
        >
          <div style={{ height: `${pages * 100}vh` }} />
        </div>
      ) : (
        void (state.top = 0)
      )}
      <Loader />
    </React.StrictMode>
  );
}

createRoot(document.getElementById('app') as HTMLElement).render(<App />);
