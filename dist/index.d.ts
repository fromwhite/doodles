import * as THREE from "three";
import { ThreeElement } from "@react-three/fiber";
import * as _$react_jsx_runtime0 from "react/jsx-runtime";

//#region src/aurora.d.ts
interface AuroraUniforms {
  time?: number;
  iResolution?: THREE.Vector3;
  iMouse?: THREE.Vector2;
  colorA?: THREE.Color | undefined;
  colorB?: THREE.Color | undefined;
}
declare module "@react-three/fiber" {
  interface ThreeElements {
    auroraMaterial: ThreeElement<typeof THREE.ShaderMaterial> & AuroraUniforms;
  }
}
declare const Aurora: {
  ({
    quality,
    lowRes,
    limitFps,
    fps,
    colors
  }: {
    quality?: "low" | "medium" | "high";
    lowRes?: boolean;
    limitFps?: boolean;
    fps?: number;
    colors?: [string, string] | null;
  }): _$react_jsx_runtime0.JSX.Element;
  metadata: {
    name: string;
  };
};
//#endregion
export { Aurora };