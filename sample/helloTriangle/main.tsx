// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import * as OGL from 'ogl';
import * as React from 'react';
import { useFrame, useOGL, Canvas } from 'react-ogl';

const hotpink = new OGL.Color(0xfba2d4);
const orange = new OGL.Color(0xf5ce54);

// const Box = (props: JSX.IntrinsicElements['mesh']) => {
//   const mesh = React.useRef<OGL.Mesh>(null!)
//   const [hovered, setHover] = React.useState(false)
//   const [active, setActive] = React.useState(false)

//   useFrame(() => (mesh.current.rotation.x += 0.01))

//   return (
//     <mesh
//       {...props}
//       ref={mesh}
//       scale={active ? 1.5 : 1}
//       onClick={() => setActive((value) => !value)}
//       onPointerOver={() => setHover(true)}
//       onPointerOut={() => setHover(false)}
//     >
//       <box />
//       <program
//         vertex={`
//           attribute vec3 position;
//           attribute vec3 normal;
//           uniform mat4 modelViewMatrix;
//           uniform mat4 projectionMatrix;
//           uniform mat3 normalMatrix;
//           varying vec3 vNormal;
//           void main() {
//             vNormal = normalize(normalMatrix * normal);
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//           }
//         `}
//         fragment={`
//           precision highp float;
//           uniform vec3 uColor;
//           varying vec3 vNormal;
//           void main() {
//             vec3 normal = normalize(vNormal);
//             float lighting = dot(normal, normalize(vec3(10)));
//             gl_FragColor.rgb = uColor + lighting * 0.1;
//             gl_FragColor.a = 1.0;
//           }
//         `}
//         uniforms={{ uColor: hovered ? hotpink : orange }}
//       />
//     </mesh>
//   )
// }

const Triangle = (props: JSX.IntrinsicElements['mesh']) => {
  const program = React.useRef<OGL.Program>(null!);
  const gl = useOGL((state) => state.gl);
  const geometry = new OGL.Triangle(gl);
  // const renderer = useOGL((state) => state.renderer)

  useFrame((_, t) => {
    program.current.uniforms.uTime.value = t * 0.001;
    // renderer.setSize(window.innerWidth, window.innerHeight)
  });

  return (
    <mesh {...props} geometry={geometry}>
      <box />
      <program
        ref={program}
        vertex={`
          attribute vec2 uv;
          attribute vec2 position;
          varying vec2 vUv;
          void main() {
              vUv = uv;
              gl_Position = vec4(position, 0, 1);
          }
        `}
        fragment={`
          precision highp float;
          uniform float uTime;
          uniform vec3 uColor;
          varying vec2 vUv;
          void main() {
              gl_FragColor.rgb = 0.5 + 0.3 * cos(vUv.xyx + uTime) + uColor;
              gl_FragColor.a = 1.0;
          }
        `}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new OGL.Color(0.3, 0.2, 0.5) },
        }}
      />
    </mesh>
  );
};

export default function () {
  return (
    <>
      <p>Shows react ogl rendering a basic triangle sample.</p>
      <Canvas onCreated={(state) => void state.gl.clearColor(0, 0, 0, 1)}>
        {/* <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} /> */}
        {/* Triangle Screen Shader */}
        <Triangle />
      </Canvas>
    </>
  );
}
