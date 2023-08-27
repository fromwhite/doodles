import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  Suspense,
} from 'react';
import {
  OrbitControls,
  View as ViewImpl,
  PerspectiveCamera,
} from '@react-three/drei';
import { Triangle } from './tunnel';

type Props = {
  track?: React.MutableRefObject<HTMLElement>;
  children?: React.ReactNode;
  orbit?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

type Ref = THREE.Object3D;

export const View = forwardRef<Ref, Props>(
  ({ children, orbit, ...props }, ref) => {
    const localRef = useRef(null!);
    useImperativeHandle(ref, () => localRef.current);

    return (
      <>
        <div ref={localRef} {...props} />
        <Triangle>
          <ViewImpl track={localRef}>
            {children}
            {orbit && <OrbitControls />}
          </ViewImpl>
        </Triangle>
      </>
    );
  }
);

View.displayName = 'View';

export const Common = ({ color }) => (
  <Suspense fallback={null}>
    {color && <color attach="background" args={[color]} />}
    <ambientLight intensity={0.5} />
    <pointLight position={[20, 30, 10]} intensity={1} />
    <pointLight position={[-10, -10, -10]} color="blue" />
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
  </Suspense>
);
