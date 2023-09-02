import './compontent/global.css';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Loader } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useLocation, Switch, Route, Redirect } from 'wouter';

import state from './compontent/state';
import Scene from './adapter/Scene';
import { Triangle } from './adapter/tunnel';
import * as Pages from './page';
import Wrap from './compontent/wrapper';
import Empty from './compontent/empty';
import Table from './compontent/table';

function App() {
  const table = React.useMemo(() => state.table(), []);
  const scrollArea = useRef<any>(null!);
  const [location, navigate] = useLocation();
  const onScroll = (e: any) => (state.top = e.target?.scrollTop || 0);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  const [pages, setPages] = useState(0);

  return (
    <React.StrictMode>
      <Scene
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
        eventSource={document.getElementById('app')}
        shadows
        raycaster={{ enabled: false } as any}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], far: 1000 }}
        gl={{
          powerPreference: 'high-performance',
          alpha: false,
          antialias: false,
          stencil: false,
          // depth: false,
        }}
        onCreated={({ gl }) => gl.setClearColor('#f5f5f5')}
      >
        <Reset />
        <ambientLight intensity={0.4} />
      </Scene>

      <Suspense fallback={null}>
        <Switch location={location}>
          <Route path="/doodles/">
            <Triangle>
              <Table data={table} />
            </Triangle>
          </Route>
          <Route path="/doodles/post/:No">
            {(params) =>
              Pages[`_${params.No}`] ? (
                <Wrap children={Pages[`_${params.No}`]} />
              ) : (
                <>{navigate('/doodles/empty')}</>
              )
            }
          </Route>
          <Route path="/doodles/empty">
            <Triangle>
              <Empty onReflow={setPages} />
            </Triangle>
          </Route>
          <Redirect to="/doodles/" />
        </Switch>
      </Suspense>

      {location && location.match(new RegExp(`/empty`)) ? (
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

/**
 * route to flex, drei view reset
 * resolving the bug in glScissor, causing a resize bug
 * https://github.com/pmndrs/drei/blob/937a8249a9aa6b1f648013c315e722a1b6dfe908/src/web/View.tsx#L111
 * @returns
 */
const Reset = () => {
  const [location] = useLocation();
  const { size, camera, gl, events, invalidate } = useThree();
  useEffect(() => {
    return () => {
      // camera.position.set(0, 0, 10);
      // camera.lookAt(0, 0, 0);
      // gl.setClearColor(0xffffff);
      // gl.clear(true, true);
      // gl.setViewport
      gl.setScissor(0, 0, size.width, size.height);
      // gl.setScissorTest(true);
    };
  }, [location]);

  return null;
};

createRoot(document.getElementById('app') as HTMLElement).render(<App />);
