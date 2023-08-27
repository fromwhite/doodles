import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { r3f } from './tunnel';
import React from 'react';

export default function Scene({ children, ...props }) {
  return (
    <Canvas {...props}>
      {children}
      <r3f.Out />
      <Preload all />
    </Canvas>
  );
}
