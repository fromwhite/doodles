/**
 * Not specific implementation, You should modify and implement the context according to your own ideas,
 * Provide an r3f context
 *
 * The first few parts of the periodic table are all straters, and I will try to write detailed templates as much as possible
 * The following section is what you should consider first
 *
 * Provide adapter from your existing code to get context or import from r3f or other third-party libraries
 *
 * import { Scene } from 'your/adapter'
 * # or
 * import { Canvas } from '@react-three/fiber'
 * # or other libraries
 *
 * export function App() {
 *    return (
 *      <Canvas>
 *        <Aurora />
 *      </Canvas>
 *    )
 * }
 */

import React from 'react';
import { View } from '@react-three/drei';
import { Triangle } from '../adapter/tunnel';
import Aurora from '../../src/shader/aurora';

export default function StarterWithShader() {
  const view = React.useRef<HTMLDivElement>(null!);
  return (
    <>
      <div ref={view} style={{ width: '65vw', height: '65vh' }}></div>
      <Triangle>
        <View track={view}>
          <Aurora />
        </View>
      </Triangle>
    </>
  );
}

StarterWithShader.description = `r3f starter\n\nshader`;
