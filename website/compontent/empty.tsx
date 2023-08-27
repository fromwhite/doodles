import { useScroll, Line, useAspect } from '@react-three/drei';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import { Box, Flex } from '@react-three/flex';
import React, { useRef, useCallback } from 'react';
import * as THREE from 'three';

import Geo from '../Geo';
import state from './state';
import { Text } from '../adapter/Text';
import { getURL } from './helper';

export default function Empty({
  onReflow,
  item = state.empty,
}: {
  onReflow: any;
  item?: any;
}) {
  const group = useRef<THREE.Group>(null!);
  const { viewport, size } = useThree();
  const [bW, bH] = useAspect(1920, 1920, 0.5);
  const texture = useLoader(
    THREE.TextureLoader,
    getURL(`/doodles${item.depthbox[0].image}`)
  );

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
  const imagesURL = React.useMemo(() => {
    return images.map((image) => {
      return getURL(`/doodles${image}`);
    });
  }, [images]);

  const textures = useLoader(THREE.TextureLoader, imagesURL);
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
