import * as THREE from "three";
import { useMemo, useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/aurora.tsx
const getVertexShader = () => `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const getFragmentShader = (iterations, useCustomColors) => `
  uniform vec3 iResolution;
  uniform float time;
  uniform vec2 iMouse;
  uniform vec3 colorA;
  uniform vec3 colorB;

  mat2 mm2(in float a){float c = cos(a), s = sin(a);return mat2(c,s,-s,c);}
  mat2 m2 = mat2(0.95534, 0.29552, -0.29552, 0.95534);
  float tri(in float x){return clamp(abs(fract(x)-.5),0.01,0.49);}
  vec2 tri2(in vec2 p){return vec2(tri(p.x)+tri(p.y),tri(p.y+tri(p.x)));}

  float triNoise2d(in vec2 p, float spd) {
      float z=1.8, z2=2.5, rz = 0.;
      p *= mm2(p.x*0.06);
      vec2 bp = p;
      for (float i=0.; i<5.; i++ ) {
          vec2 dg = tri2(bp*1.85)*.75;
          dg *= mm2(time*spd);
          p -= dg/z2;
          bp *= 1.3;
          z2 *= .45; z *= .42;
          p *= 1.21 + (rz-1.0)*.02;
          rz += tri(p.x+tri(p.y))*z;
          p*= -m2;
      }
      return clamp(1./pow(rz*29., 1.3),0.,.55);
  }

  float hash21(in vec2 n){ return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }

  vec4 aurora(vec3 ro, vec3 rd) {
      vec4 col = vec4(0);
      vec4 avgCol = vec4(0);
      for(float i=0.; i < ${iterations.toFixed(1)}; i++) {
          float of = 0.006*hash21(gl_FragCoord.xy)*smoothstep(0.,15., i);
          float pt = ((.8+pow(i,1.4)*.002)-ro.y)/(rd.y*2.+0.4) - of;
          vec3 bpos = ro + pt*rd;
          float rzt = triNoise2d(bpos.zx, 0.06);
          vec4 col2 = vec4(0,0,0, rzt);
          ${useCustomColors ? `col2.rgb = mix(colorA, colorB, sin(i * 0.043) * 0.5 + 0.5) * rzt;` : `col2.rgb = (sin(1. - vec3(2.15, -0.5, 1.2) + i * 0.043) * 0.5 + 0.5) * rzt;`}
          avgCol = mix(avgCol, col2, .5);
          col += avgCol*exp2(-i*0.065 - 2.5)*smoothstep(0.,5., i);
      }
      return col * 1.8 * clamp(rd.y*15.+.4,0.,1.);
  }

  vec3 nmzHash33(vec3 q) { uvec3 p = uvec3(ivec3(q)); p = p*uvec3(374761393U, 1103515245U, 668265263U) + p.zxy + p.yzx; p = p.yzx*(p.zxy^(p >> 3U)); return vec3(p^(p >> 16U))*(1.0/vec3(0xffffffffU)); }
  vec3 stars(in vec3 p) { vec3 c = vec3(0.); float res = iResolution.x; for (float i=0.;i<4.;i++) { vec3 q = fract(p*(.15*res))-0.5; vec3 id = floor(p*(.15*res)); vec2 rn = nmzHash33(id).xy; float c2 = 1.-smoothstep(0.,.6,length(q)); c2 *= step(rn.x,.0005+i*i*0.001); c += c2*(mix(vec3(1.0,0.49,0.1),vec3(0.75,0.9,1.),rn.y)*0.1+0.9); p *= 1.3; } return c*c*.8; }
  vec3 bg(in vec3 rd) { float sd = dot(normalize(vec3(-0.5, -0.6, 0.9)), rd)*0.5+0.5; return mix(vec3(0.05,0.1,0.2), vec3(0.1,0.05,0.2), pow(sd, 5.))*.63; }

  void main() {
      vec2 q = gl_FragCoord.xy / iResolution.xy;
      vec3 ro = vec3(0,0,-6.7);
      vec3 rd = normalize(vec3(q - 0.5, 1.3));
      vec2 mo = iMouse.xy / iResolution.xy - 0.5;
      mo = (length(iMouse.xy) < 0.01) ? vec2(-0.1, 0.1) : mo;
      rd.yz *= mm2(mo.y);
      rd.xz *= mm2(mo.x + sin(time*0.05)*0.2);
      vec3 col = vec3(0.);
      float fade = smoothstep(0.,0.01,abs(rd.y))*0.1+0.9;
      if (rd.y > 0.){
          col = bg(rd)*fade;
          vec4 aur = smoothstep(0.,1.5,aurora(ro,rd))*fade;
          col += stars(rd); col = col*(1.-aur.a) + aur.rgb;
      } else {
          rd.y = abs(rd.y); col = bg(rd)*fade*0.6;
          vec4 aur = smoothstep(0.0,2.5,aurora(ro,rd));
          col += stars(rd)*0.1; col = col*(1.-aur.a) + aur.rgb;
          float nz2 = triNoise2d((ro + ((0.5-ro.y)/rd.y)*rd).xz*vec2(.5,.7), 0.01);
          col += mix(vec3(0.2,0.25,0.5)*0.08,vec3(0.3,0.3,0.5)*0.7, nz2*0.4);
      }
      gl_FragColor = vec4(col, 1.0);
  }
`;
const Aurora = ({ quality = "medium", lowRes = false, limitFps = true, fps = 30, colors = null }) => {
	const meshRef = useRef(null);
	const { size } = useThree();
	const lastFrameTime = useRef(0);
	const iterations = useMemo(() => {
		if (quality === "low") return 12;
		if (quality === "high") return 48;
		return 32;
	}, [quality]);
	const CustomMaterial = useMemo(() => {
		const M = shaderMaterial({
			time: 0,
			iResolution: new THREE.Vector3(),
			iMouse: new THREE.Vector2(0, 0),
			colorA: new THREE.Color(colors ? colors[0] : "#ffffff"),
			colorB: new THREE.Color(colors ? colors[1] : "#ffffff")
		}, getVertexShader(), getFragmentShader(iterations, !!colors));
		extend({ AuroraMaterial: M });
		return M;
	}, [iterations, !!colors]);
	const [w, h] = useMemo(() => [size.width * .9, size.height * .84], [size]);
	const resolution = useMemo(() => {
		const factor = lowRes ? .5 : 1;
		return new THREE.Vector3(w * factor, h * factor, 1);
	}, [
		w,
		h,
		lowRes
	]);
	useFrame((state, delta) => {
		const currentTime = state.clock.getElapsedTime();
		if (limitFps && currentTime - lastFrameTime.current < 1 / fps) return;
		lastFrameTime.current = currentTime;
		if (!meshRef.current) return;
		const mat = meshRef.current.material;
		mat.time += delta;
		const factor_0 = lowRes ? .5 : 1;
		mat.iMouse.lerp(new THREE.Vector2((state.mouse.x * .5 + .5) * w * factor_0, (state.mouse.y * .5 + .5) * h * factor_0), .05);
	});
	return /* @__PURE__ */ jsxs("mesh", {
		ref: meshRef,
		children: [/* @__PURE__ */ jsx("planeGeometry", { args: [w, h] }), /* @__PURE__ */ jsx("auroraMaterial", {
			iResolution: resolution,
			colorA: colors ? new THREE.Color(colors[0]) : void 0,
			colorB: colors ? new THREE.Color(colors[1]) : void 0
		}, `${CustomMaterial.key}-${quality}-${lowRes}-${!!colors}`)]
	});
};
Aurora.metadata = { name: "Aurora" };
//#endregion
export { Aurora };
