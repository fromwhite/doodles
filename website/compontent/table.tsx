import React, { useEffect, useState } from 'react';

import { useThree } from '@react-three/fiber';
import { Flex, Box } from '@react-three/flex';
import { useAspect, useCursor } from '@react-three/drei';
import { useLocation } from 'wouter';
import { Text } from '../adapter/Text';
import { getURL } from './helper';
import * as Pages from '../page';

export default function Table({ data }) {
  const [_, navigate] = useLocation();
  const { size } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height, 1);

  const [hovered, set] = useState(false);
  useCursor(hovered, 'pointer');

  const cellWidth = (vpWidth - 18 * 2 * 0.05) / 18,
    cellHeight = (vpHeight - 6 * 2 * 0.05) / 6;
  const font = getURL(`/doodles/DotGothic16-Regular.ttf`);

  return (
    <group>
      <Flex
        flexDirection="column"
        align="center"
        justify="space-around"
        size={[vpWidth, vpHeight, 0]}
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
            {data.map((k, i) => (
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
                            navigate(
                              Pages[`_${k.No}`]
                                ? `/doodles/post/${k.No}`
                                : `/doodles/empty`
                            );
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
                            overflowWrap="break-word"
                            lineHeight={1.15}
                            fontSize={0.23}
                            letterSpacing={0.15}
                            maxWidth={1.1}
                            anchorX={0.5}
                            anchorY={-0.95}
                          >
                            {Pages[`_${k.No}`]?.default?.description ??
                              `Empty\n`}
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
