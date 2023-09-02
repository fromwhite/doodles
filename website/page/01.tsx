import React from 'react';
import { Triangle } from '../adapter/tunnel';
import Aurora from '../../src/shader/aurora';

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

export default function StarterWithShader() {
  return (
    <Triangle>
      <Aurora />
    </Triangle>
  );
}

StarterWithShader.description = `r3f starter\n\nshader`;
