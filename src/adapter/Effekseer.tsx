/**
 * r3f effekseer wrap
 * Wait for npm install git+https, make changes later
 * https://github.com/Ctrlmonster/r3f-effekseer
 */
/// <reference types="vite/client" />
import React, {
  createContext,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useEffect,
  useMemo,
  useState,
  useContext,
} from 'react';
import { Pass } from 'postprocessing';
import {
  Camera,
  Scene,
  WebGLRenderer,
  WebGLRenderTarget,
  Clock,
  Group,
  Vector3,
} from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { suspend } from 'suspend-react';
// import wasm
import wasmPath from '../vendor/effekseer.wasm?url';
import { effekseer } from '../vendor/effekseer.js';
// import type effekseer native
import type {
  EffekseerContext,
  EffekseerEffect,
  EffekseerHandle,
} from 'src/adapter/vendor/effekseer-native';

// effekseer
export class EffekseerRenderPass extends Pass {
  context: EffekseerContext;

  constructor(scene: Scene, camera: Camera, context: EffekseerContext) {
    super();
    this.scene = scene;
    this.camera = camera;
    this.context = context;
  }

  render(
    renderer: WebGLRenderer,
    inputBuffer: WebGLRenderTarget | null,
    outputBuffer: WebGLRenderTarget | null
  ) {
    renderer.setRenderTarget(outputBuffer);
    renderer.resetState();

    this.context.setProjectionMatrix(
      this.camera.projectionMatrix.elements as unknown as Float32Array
    );
    this.context.setCameraMatrix(
      this.camera.matrixWorldInverse.elements as unknown as Float32Array
    );
    this.context.draw();
  }
}
type EffekseerRenderProps = {};
export const EffekseerRender = forwardRef(function (
  props: EffekseerRenderProps,
  ref: ForwardedRef<EffekseerRenderPass>
) {
  const { camera, scene } = useThree();
  const { manager } = useContext(EffekseerReactContext);
  const pass = useMemo(
    () => new EffekseerRenderPass(scene, camera, manager.context!),
    []
  );

  return <primitive ref={ref} object={pass} />;
});

// classes / objects
// EffectInstance
export type EffectInstanceSetting =
  | 'paused'
  | 'position'
  | 'rotation'
  | 'scale'
  | 'speed'
  | 'randomSeed'
  | 'visible'
  | 'matrix'
  | 'dynamicInput'
  | 'targetPosition'
  | 'color';

export class EffectInstance {
  static #idCounter = 0;
  readonly id = EffectInstance.#idCounter++;

  _parentPosition = [0, 0, 0];
  _parentPositionDirty: boolean = false;

  _parentRotation = [0, 0, 0];
  _parentRotationDirty: boolean = false;

  _parentScale = [1, 1, 1];
  _parentScaleDirty: boolean = false;

  _localPosition = [0, 0, 0];
  _localRotation = [0, 0, 0];
  _localScale = [1, 1, 1];

  _latestHandle: EffekseerHandle | null = null;

  _dynamicInputs: (number | undefined)[] = [];

  #activateSettingByName = new Map<
    EffectInstanceSetting,
    (...args: any[]) => void
  >();
  #paused = false;

  syncedToParent = true;

  _time = 0;

  #currentCompletionPromise: Promise<void> | null = null;
  _currentCompletionCallback: (() => void) | null = null;

  get running() {
    return this._latestHandle?.exists;
  }

  constructor(
    public name: string,
    public effect: EffekseerEffect,
    public manager: EffekseerManager
  ) {}

  addCompletionCallback(callback: () => void) {}

  /**
   * Start playing the effect with the currently active settings. This method always starts the
   * effect anew. If you want to unpause the effect instead, call EffectInstance.setPaused(false).
   * There is also an optional parameter to let the previous running instance of this effect
   * continue while starting the effect new. You are not able to interact with the previous
   * running instance in any way, after calling play().
   * @param playSettings - Optional settings for the play() method
   * @param playSettings.continuePrevious - If true, the previous running instance of this effect will continue playing
   * @param playSettings.stopSyncingWithParent - If true, the effect will no longer sync its transforms with the parent
   * after the effect has started playing.
   */
  async play(playSettings?: { stopSyncingWithParent: boolean }) {
    const { stopSyncingWithParent } = playSettings || {};

    if (this.manager) {
      this.#paused = false;
      this.syncedToParent = !stopSyncingWithParent;

      // finish the last run of this effect
      if (this._latestHandle?.exists) {
        this._currentCompletionCallback?.();
        this._currentCompletionCallback = null;
        this._latestHandle?.stop();
      }
      // create a new promise for this run
      this.#currentCompletionPromise = new Promise((resolve) => {
        this._currentCompletionCallback = resolve;
      });

      this.manager._runningInstances.add(this);

      // get a new handle
      this._latestHandle = this.manager.playEffect(this.name) || null;

      // Re-run all the setters that the user specified for this new handle
      for (const activateSetting of this.#activateSettingByName.values()) {
        activateSetting();
      }
      return this.#currentCompletionPromise;
    }
  }

  /**
   * Set the paused flag of this effect instance.
   * if specified true, this effect playing will not advance.
   * Call setPaused(false) to unpause an effect.
   * @param {boolean} paused Paused flag
   */
  setPaused(paused: boolean) {
    this.#paused = paused;
    this._prepareSetting('paused', () => this._latestHandle!.setPaused(paused));
    this._latestHandle?.setPaused(paused);
  }

  /**
   * Whether the effect is currently paused. Call .setPaused(false) to continue
   * a paused effect. EffectInstance.play() will always start a new effect.
   */
  get paused() {
    return this.#paused;
  }

  // Stop and StopRoot don't get saved as settings. They only get applied to the current effect handle.
  /**
   * Stop this effect instance.
   */
  stop() {
    this.manager._runningInstances.delete(this);
    this._latestHandle?.stop();
  }

  /**
   * Stop the root node of this effect instance.
   */
  stopRoot() {
    this.manager._runningInstances.delete(this);
    this._latestHandle?.stopRoot();
  }

  /**
   * Get the names of all the settings that are currently active.
   */
  get activeSettings(): EffectInstanceSetting[] {
    return [...this.#activateSettingByName.keys()];
  }

  /**
   * Sets a setting that should be applied to the effect handle, next time
   * EffectInstance.play() is called. This will not affect the currently playing
   * effect if there is one. This method is usually only called internally, and you
   * should check if there isn't a method that sets your setting directly.
   * If you have need for it anyway, you can call it likely this:
   * <pre>
   *   effectInstance._prepareSetting("speed", () => effectInstance._latestHandle!.setSpeed(speed))
   * </pre>
   * @param name
   * @param activateSetting
   */
  _prepareSetting(name: EffectInstanceSetting, activateSetting: () => void) {
    this.#activateSettingByName.set(name, activateSetting);
  }

  /**
   * Drop an effect setting. The next time the effect is played, this setting will not be applied to it.
   * @param name
   */
  dropSetting(name: EffectInstanceSetting) {
    this.#activateSettingByName.delete(name);
  }

  // Transform Setters - These have a bit more dirty checking and stuff going on,
  // because they get called every frame from the <Effect> RC

  /**
   * Set the local position of this effect instance.
   * This position is relative to the parent position,
   * which the <Effect> RC updates each frame through
   * effectInstance_setParentPosition().
   */
  setPosition(x: number, y: number, z: number) {
    if (
      this._parentPositionDirty ||
      x !== this._localPosition[0] ||
      y !== this._localPosition[1] ||
      z !== this._localPosition[2]
    ) {
      this._localPosition[0] = x;
      this._localPosition[1] = y;
      this._localPosition[2] = z;

      const globalX = x + this._parentPosition[0];
      const globalY = y + this._parentPosition[1];
      const globalZ = z + this._parentPosition[2];
      this._parentPositionDirty = false;

      this._prepareSetting('position', () =>
        this._latestHandle!.setLocation(globalX, globalY, globalZ)
      );
      this._latestHandle?.setLocation(globalX, globalY, globalZ); // if the effect is currently playing
    }
  }

  /**
   * Warning: Only call this method if you created this
   * EffectInstance imperatively!<br/>
   * The parent position of this effect. If this EffectInstance
   * was created through a <Effect> React component, that component
   * will call this method each frame, which will override your custom
   * parent position.
   */
  _setParentPosition(x: number, y: number, z: number) {
    if (
      x !== this._parentPosition[0] ||
      y !== this._parentPosition[1] ||
      z !== this._parentPosition[2]
    ) {
      this._parentPosition[0] = x;
      this._parentPosition[1] = y;
      this._parentPosition[2] = z;
      this._parentPositionDirty = true;
    }
  }

  /**
   * Set the local rotation of this effect instance.
   * This rotation gets added on top of the parent rotation,
   * which the <Effect> RC updates each frame through
   * _setParentRotation().
   */
  setRotation(x: number, y: number, z: number) {
    if (
      this._parentRotationDirty ||
      x !== this._localRotation[0] ||
      y !== this._localRotation[1] ||
      z !== this._localRotation[2]
    ) {
      this._localRotation[0] = x;
      this._localRotation[1] = y;
      this._localRotation[2] = z;

      const globalX = x + this._parentRotation[0];
      const globalY = y + this._parentRotation[1];
      const globalZ = z + this._parentRotation[2];
      this._parentRotationDirty = false;

      this._prepareSetting('rotation', () =>
        this._latestHandle!.setRotation(globalX, globalY, globalZ)
      );
      this._latestHandle?.setRotation(globalX, globalY, globalZ); // if the effect is currently playing
    }
  }

  /**
   * Warning: Only call this method if you created this
   * EffectInstance imperatively!<br/>
   * The parent rotation of this effect. If this EffectInstance
   * was created through a <Effect> React component, that component
   * will call this method each frame, which will override your custom
   * parent rotation.
   */
  _setParentRotation(x: number, y: number, z: number) {
    if (
      x !== this._parentRotation[0] ||
      y !== this._parentRotation[1] ||
      z !== this._parentRotation[2]
    ) {
      this._parentRotation[0] = x;
      this._parentRotation[1] = y;
      this._parentRotation[2] = z;
      this._parentRotationDirty = true;
    }
  }

  /**
   * Set the local position of this effect instance.
   * This scale is multiplied on top of the parent scale,
   * which the <Effect> RC updates each frame through
   * effectInstance_setParentScale().
   */
  setScale(x: number, y: number, z: number) {
    if (
      this._parentScaleDirty ||
      x !== this._localScale[0] ||
      y !== this._localScale[1] ||
      z !== this._localScale[2]
    ) {
      this._localScale[0] = x;
      this._localScale[1] = y;
      this._localScale[2] = z;

      const globalX = x * this._parentScale[0];
      const globalY = y * this._parentScale[1];
      const globalZ = z * this._parentScale[2];
      this._parentScaleDirty = false;

      this._prepareSetting('scale', () =>
        this._latestHandle!.setScale(globalX, globalY, globalZ)
      );
      this._latestHandle?.setScale(globalX, globalY, globalZ); // if the effect is currently playing
    }
  }

  /**
   * Warning: Only call this method if you created this
   * EffectInstance imperatively!<br/>
   * The parent scale of this effect. If this EffectInstance
   * was created through a <Effect> React component, that component
   * will call this method each frame, which will override your custom
   * parent scale.
   */
  _setParentScale(x: number, y: number, z: number) {
    if (
      x !== this._parentScale[0] ||
      y !== this._parentScale[1] ||
      z !== this._parentScale[2]
    ) {
      this._parentScale[0] = x;
      this._parentScale[1] = y;
      this._parentScale[2] = z;
      this._parentScaleDirty = true;
    }
  }

  /**
   * Set the playback speed of this effect.
   * @param {number} speed Speed ratio
   */
  setSpeed(speed: number) {
    this._prepareSetting('speed', () => this._latestHandle!.setSpeed(speed));
    this._latestHandle?.setSpeed(speed);
  }

  /**
   * Set the random seed of this effect.
   * @param {number} randomSeed random seed
   */
  setRandomSeed(randomSeed: number) {
    this._prepareSetting('randomSeed', () =>
      this._latestHandle!.setRandomSeed(randomSeed)
    );
    this._latestHandle?.setRandomSeed(randomSeed);
  }

  /**
   * Set the visible flag of this effect instance.
   * if specified false, this effect will be invisible.
   * @param {boolean} shown Shown flag
   */
  setVisible(shown: boolean) {
    this._prepareSetting('visible', () => this._latestHandle!.setShown(shown));
    this._latestHandle?.setShown(shown);
  }

  /**
   * Set the target position of this effect instance.
   */
  setTargetPosition(x: number, y: number, z: number) {
    this._prepareSetting('targetPosition', () =>
      this._latestHandle!.setTargetLocation(x, y, z)
    );
    this._latestHandle?.setTargetLocation(x, y, z);
  }

  /**
   * Set the color of this effect instance.
   * @param {number} r R channel value of color
   * @param {number} g G channel value of color
   * @param {number} b B channel value of color
   * @param {number} a A channel value of color
   */
  setColor(r: number, g: number, b: number, a: number) {
    this._prepareSetting('color', () =>
      this._latestHandle!.setAllColor(r, g, b, a)
    );
    this._latestHandle?.setAllColor(r, g, b, a);
  }

  /**
   * Set the model matrix of this effect instance.
   * @param {array} matrixArray An array that is required 16 elements
   */
  setMatrix(matrixArray: Float32Array) {
    this._prepareSetting('matrix', () =>
      this._latestHandle!.setMatrix(matrixArray)
    );
    this._latestHandle?.setMatrix(matrixArray);
  }

  /**
   * Specify a dynamic parameter, which changes effect parameters dynamically while playing
   * @param {number} index slot index
   * @param {number} value value
   */
  setDynamicInput(index: number, value: number | undefined) {
    this._dynamicInputs[index] = value;
    this._prepareSetting('dynamicInput', () => {
      for (let i = 0; i < this._dynamicInputs.length; i++) {
        const v = this._dynamicInputs[i];
        if (v != undefined) {
          this._latestHandle!.setDynamicInput(i, v);
        }
      }
    });
    if (value != undefined) this._latestHandle?.setDynamicInput(index, value);
  }

  /**
   * get a dynamic parameter, which changes effect parameters dynamically while playing
   * @param {number} index slot index
   */
  getDynamicInput(index: number): number | undefined {
    return this._dynamicInputs[index];
  }

  /**
   * Sends the specified trigger to the currently playing effect. The trigger value is not saved
   * after the effect finished playing. If you call .play() again, all previous trigger values are reset.
   * @param {number} index trigger index
   */
  sendTrigger(index: number) {
    this._latestHandle?.sendTrigger(index);
  }
}

// effekseerManager
export type EffectLoadingPackage = {
  name: string;
  path: string;
  scale: number;
  onload: (() => void) | undefined;
  onerror: ((reason: string, path: string) => void) | undefined;
  redirect: ((path: string) => string) | undefined;
  resolve: (value: EffekseerEffect | PromiseLike<EffekseerEffect>) => void;
  reject: (reason?: any) => void;
};
export type EffekseerSettings = {
  instanceMaxCount?: number;
  squareMaxCount?: number;
  enableExtensionsByDefault?: boolean;
  enablePremultipliedAlpha?: boolean;
  enableTimerQuery?: boolean;
  onTimerQueryReport?: (averageDrawTime: number) => void;
  timerQueryReportIntervalCount?: number;
};
export class EffekseerManager {
  effects: Record<string, EffekseerEffect> = {};
  context: EffekseerContext | null = null;
  camera: Camera | null = null;
  clock: Clock | null = null;
  gl: WebGLRenderer | null = null;
  scene: Scene | null = null;
  settings: EffekseerSettings | null = null;

  // fast rendering by skipping state fetching.
  // If there is a problem with the drawing, please set this flag to false.
  fastRenderMode = true; // TODO: needs to be exposed to RC
  initialized = false;

  effectLoadingQueue = new Set<EffectLoadingPackage>();
  loadingCallbacksByName = new Map<
    string,
    {
      success: () => void;
      failure: (m: string, path: string) => void;
    }[]
  >();

  #setEffects: ((effects: Record<string, EffekseerEffect>) => void) | null =
    null;
  #isPreloadingRuntime: boolean = false;

  _effectInstances: Record<string, Set<EffectInstance>> = {};
  _runningInstances: Set<EffectInstance> = new Set();

  updateEffects(dt: number) {
    for (const instance of this._runningInstances) {
      if (instance.paused) continue;

      // the effect is still running
      if (instance._latestHandle?.exists) {
        instance._time += dt;
      }
      // the effect just finished
      else {
        instance._time = 0;
        instance._currentCompletionCallback?.();
        instance._currentCompletionCallback = null;
        this._runningInstances.delete(instance);
      }
    }
  }

  async loadEffect(
    name: string,
    path: string,
    scale: number,
    onload: (() => void) | undefined,
    onerror: ((reason: string, path: string) => void) | undefined,
    redirect: ((path: string) => string) | undefined
  ): Promise<EffekseerEffect> {
    // Check if the manager is initialized, if it isn't this effect will be automatically
    // loaded as soon the manager is ready.

    if (this.initialized) {
      return new Promise<EffekseerEffect>((resolve, reject) => {
        this.#addEffect({
          name,
          path,
          scale,
          onload,
          onerror,
          redirect,
          resolve,
          reject,
        });
      });
    }
    // if the manager isn't done initializing
    else {
      // The effect will be loaded as soon as the manager is done initializing.
      // The promise will be resolved when the effect is loaded.
      return new Promise<EffekseerEffect>((resolve, reject) => {
        this.effectLoadingQueue.add({
          name,
          path,
          scale,
          onload,
          onerror,
          redirect,
          resolve,
          reject,
        });
      });
    }
  }

  #addEffect(args: EffectLoadingPackage) {
    const { name, path, scale, onload, onerror, redirect, resolve, reject } =
      args;
    // early return if the effect is already loaded
    if (this.effects[name]) {
      resolve(this.effects[name]);
      return;
    }

    // We don't want to start loading the same effect multiple times,
    // that's why we check if it's currently loading and in that case just
    // pass the success / failure callbacks to the callback that will be
    // executed when the previously started loading process finishes.
    if (this.loadingCallbacksByName.has(name)) {
      this.loadingCallbacksByName.get(name)!.push({
        success: () => {
          onload?.();
          resolve(this.effects[name]);
        },
        failure: (m: string, path: string) => {
          onerror?.(m, path);
          reject();
        },
      });
    }

    // Start a new loading process for this effect
    else {
      if (!this.context)
        throw new Error("loading effect while context isn't ready");

      this.loadingCallbacksByName.set(name, []);

      const effect = this.context!.loadEffect(
        path,
        scale,
        // Packaging promise resolve and reject with user callbacks,
        // this way we resolve the promise when the effect is loaded.
        () => {
          this.effects[name] = effect;
          onload?.();
          resolve(this.effects[name]);
          // get all other promises that are waiting for this effect to load and resolve them too
          const loadingCallbacks = this.loadingCallbacksByName.get(name);
          if (loadingCallbacks) {
            for (const callback of loadingCallbacks) {
              callback.success();
            }
          }
          this.loadingCallbacksByName.delete(name);
          this.#setEffects?.(this.effects);
        },
        // same if the loading process failed - reject all promises
        (m, path) => {
          onerror?.(m, path);
          reject();
          const loadingCallbacks = this.loadingCallbacksByName.get(name);
          if (loadingCallbacks) {
            for (const callback of loadingCallbacks) {
              callback.failure(m, path);
            }
          }
        },
        redirect
      );
    }
  }

  /**
   * Effects can not be loaded before the EffekseerContext is created
   * @param name
   * @param path
   * @param scale
   * @param onload
   * @param onerror
   */
  preloadEffect(
    name: string,
    path: string,
    scale?: number,
    onload?: (() => void) | undefined,
    onerror?: ((reason: string, path: string) => void) | undefined
  ) {
    // this will trigger the runtime to preload, if it hasn't already
    this.preloadRuntime();

    // this will cause the effect to load as soon as the runtime is initialized
    this.loadEffect(name, path, scale ?? 1, onload, onerror, undefined);
  }

  /**
   * Gets automatically called via preloadEffect
   */
  preloadRuntime() {
    if (this.context == null && !this.#isPreloadingRuntime) {
      this.#isPreloadingRuntime = true;

      effekseer.initRuntime(
        wasmPath,
        () => {
          this.#isPreloadingRuntime = false;
          // check if this.init() has been called since we started initializing
          if (this.gl && this.#setEffects) {
            this.#completeRuntimeInitialization();
          }
        },
        () => {
          console.log('Failed to preload effekseer');
        }
      );
    }
  }

  init(
    gl: WebGLRenderer,
    scene: Scene,
    camera: Camera,
    clock: Clock,
    settings: EffekseerSettings | null,
    setEffects: (effects: Record<string, EffekseerEffect>) => void
  ) {
    this.camera = camera;
    this.clock = clock;
    this.gl = gl;
    this.scene = scene;
    this.settings = settings;
    this.#setEffects = (effects) => setEffects({ ...effects });

    // Check whether preloading the runtime is completed. In this case we only need to call complete
    if (this.context) {
      this.#completeRuntimeInitialization();
      return;
    }
    // If it isn't, check if we preloaded at all. If we didn't start initialization now.
    // If we are preloading and are just not ready, complete will be called on completion
    if (!this.#isPreloadingRuntime) {
      // init and callback can also get separated, so the runTime could also be preloaded
      effekseer.initRuntime(
        wasmPath,
        () => {
          this.#completeRuntimeInitialization();
        },
        () => {
          console.log('Failed to initialize effekseer');
        }
      );
    }
  }

  #completeRuntimeInitialization() {
    this.context = effekseer.createContext();
    this.#isPreloadingRuntime = false;

    this.context!.init(this.gl!.getContext(), this.settings ?? undefined);

    if (this.fastRenderMode) {
      this.context!.setRestorationOfStatesFlag(false);
    }
    // load the effects that are already waiting
    for (const effectInitPackage of this.effectLoadingQueue) {
      this.#addEffect(effectInitPackage);
      this.effectLoadingQueue.delete(effectInitPackage);
    }
    // we need to update the React context states whenever a new effect
    // gets loaded, that's why save a reference to the setter here
    this.#setEffects!(this.effects);
    this.initialized = true;
  }

  destroy() {
    if (this.context) {
      // destroy all leftover effects
      for (const effect of Object.keys(this.effects)) {
        this.context.releaseEffect(effect);
      }
      // destroy the context
      effekseer.releaseContext(this.context);
      this.context = null!;
    }
    this.#setEffects = null!;
    this.initialized = false;
  }

  update(dt: number, render: boolean) {
    if (this.context) {
      this.context.update(dt * 60.0);
      this.updateEffects(dt);

      if (render) {
        this.context.setProjectionMatrix(
          this.camera!.projectionMatrix.elements as unknown as Float32Array
        );
        this.context.setCameraMatrix(
          this.camera!.matrixWorldInverse.elements as unknown as Float32Array
        );
        this.context.draw();

        if (this.fastRenderMode) {
          this.gl!.resetState();
        }
      }
    }
  }

  _registerEffectInstance(instance: EffectInstance) {
    const { name } = instance;
    if (this._effectInstances[name]) {
      this._effectInstances[name].add(instance);
    } else {
      this._effectInstances[name] = new Set([instance]);
    }
  }

  _removeEffectInstance(instance: EffectInstance) {
    const { name } = instance;
    const allInstances = this._effectInstances[name];
    allInstances.delete(instance);
    if (allInstances.size === 0) {
      delete this._effectInstances[name];
    }
  }

  /**
   *
   * @param name - name of the effect
   * @param force - if the force flag is specified,
   * the system won't check if any EffectInstances using that effect are left
   */
  disposeEffect(name: string, force = false) {
    if (this.effects && this.effects[name]) {
      // before we can remove the effect completely, we
      // have to check whether any other instances are
      // still using the effect.
      if (!this._effectInstances[name] || force) {
        this.context?.releaseEffect(this.effects[name]);
        delete this.effects[name];
        this.#setEffects?.(this.effects);
      }
    } else {
      console.warn(`Effect ${name} not found`);
    }
  }

  playEffect(name: string) {
    return this.context?.play(this.effects[name], 0, 0, 0);
  }
}
export const effekseerManager = new EffekseerManager();

// EffekseerReactContext
export const EffekseerReactContext = createContext<{
  effects: Record<string, EffekseerEffect>;
  manager: EffekseerManager;
}>({
  effects: {},
  manager: effekseerManager,
});

// react components
export const Effekseer = forwardRef(
  (
    {
      children,
      settings,
      ejectRenderer,
    }: {
      children: ReactNode;
      settings?: EffekseerSettings;
      ejectRenderer?: boolean;
    },
    ref: ForwardedRef<EffekseerManager>
  ) => {
    const [effects, setEffects] = useState<Record<string, EffekseerEffect>>({});
    const { gl, scene, camera, clock } = useThree(
      ({ gl, scene, camera, clock }) => ({ gl, scene, camera, clock })
    );

    useImperativeHandle(ref, () => effekseerManager, []);
    useLayoutEffect(() => {
      // init the simulation - this is how you get access
      // to scene, camera, renderer etc. from your imperative code.
      effekseerManager.init(
        gl,
        scene,
        camera,
        clock,
        settings || null,
        setEffects
      );

      return () => {
        effekseerManager.destroy();
      };
    }, [settings, gl, scene, camera, clock]);

    useFrame(
      (state, delta) => {
        // connecting the simulation to r3f's render loop,
        // it will now get updated every frame
        if (!ejectRenderer) {
          gl.render(scene, camera);
        }
        effekseerManager.update(delta, !ejectRenderer);
      },
      ejectRenderer ? undefined : 1
    );

    return (
      <EffekseerReactContext.Provider
        value={{
          effects: effects,
          manager: effekseerManager,
        }}
      >
        {children}
      </EffekseerReactContext.Provider>
    );
  }
);

export type EffektProps = {
  // required props for initialization / loading
  name: string;
  src: string;

  // effect settings
  position?: [x: number, y: number, z: number];
  rotation?: [x: number, y: number, z: number];
  scale?: [x: number, y: number, z: number];
  speed?: number;
  randomSeed?: number;
  visible?: boolean;
  dynamicInput?: (number | undefined)[];
  targetPosition?: [x: number, y: number, z: number];
  color?: [r: number, g: number, b: number, alpha: number];
  paused?: boolean;

  // r3f specifics
  playOnMount?: boolean;
  dispose?: null;
  debug?: boolean;

  // loading callbacks
  onload?: (() => void) | undefined;
  onerror?: ((reason: string, path: string) => void) | undefined;
  redirect?: ((path: string) => string) | undefined;
};

export const Effekt = forwardRef(
  (
    {
      src,
      name,
      position,
      rotation,
      scale,
      speed,
      visible,
      randomSeed,
      targetPosition,
      dynamicInput,
      color,
      paused,
      playOnMount,
      dispose,
      debug,
      onerror,
      onload,
      redirect,
    }: EffektProps,
    ref: ForwardedRef<EffectInstance>
  ) => {
    const group = useRef<Group>(null!);
    const worldPos = useRef(new Vector3());
    const worldScale = useRef(new Vector3());

    const { manager, effects } = useContext(EffekseerReactContext); // do you add an error if the context is missing?

    const effect = suspend(async () => {
      return await manager.loadEffect(name, src, 1, onload, onerror, redirect);
    }, [src, name]);

    const [effektInstance] = useState(
      new EffectInstance(name, effect, manager)
    );
    useImperativeHandle(ref, () => effektInstance, []);

    useEffect(() => {
      manager._registerEffectInstance(effektInstance);

      if (playOnMount) {
        effektInstance?.play();
      }
      return () => {
        manager._removeEffectInstance(effektInstance);
        if (dispose != null) {
          manager.disposeEffect(name);
        }
      };
    }, []);

    useEffect(() => {
      if (position) {
        effektInstance.setPosition(position[0], position[1], position[2]);
      } else {
        effektInstance.setPosition(0, 0, 0);
      }
    }, [position]);

    useEffect(() => {
      if (rotation) {
        effektInstance.setRotation(rotation[0], rotation[1], rotation[2]);
      } else {
        effektInstance.setRotation(0, 0, 0);
      }
    }, [rotation]);

    useEffect(() => {
      if (scale) {
        effektInstance.setScale(scale[0], scale[1], scale[2]);
      } else {
        effektInstance.setScale(1, 1, 1);
      }
    }, [scale]);

    useEffect(() => {
      if (speed != undefined) {
        effektInstance.setSpeed(speed);
      } else {
        effektInstance.setSpeed(1);
      }
    }, [speed]);

    useEffect(() => {
      if (visible != undefined) {
        effektInstance.setVisible(visible);
      } else {
        effektInstance.setVisible(true);
      }
    }, [visible]);

    useEffect(() => {
      if (randomSeed != undefined) {
        effektInstance.setRandomSeed(randomSeed);
      } else {
        effektInstance.dropSetting('randomSeed');
      }
    }, [randomSeed]);

    useEffect(() => {
      if (targetPosition != undefined) {
        effektInstance.setTargetPosition(
          targetPosition[0],
          targetPosition[1],
          targetPosition[2]
        );
      } else {
        effektInstance.dropSetting('targetPosition');
      }
    }, [targetPosition]);

    useEffect(() => {
      if (dynamicInput != undefined) {
        for (let i = 0; i < dynamicInput.length; i++)
          effektInstance.setDynamicInput(i, dynamicInput[i]);
      } else {
        effektInstance.dropSetting('dynamicInput');
      }
    }, [dynamicInput]);

    useEffect(() => {
      if (color != undefined) {
        effektInstance.setColor(color[0], color[1], color[2], color[3]);
      } else {
        effektInstance.dropSetting('color');
      }
    }, [color]);

    useEffect(() => {
      effektInstance.setPaused(!!paused);
    }, [paused]);

    useFrame((_, delta) => {
      // we sync the parent transforms every frame here (effect Instance makes dirty checks internally)
      if (effektInstance && effektInstance.syncedToParent) {
        const pos = group.current.getWorldPosition(worldPos.current);
        effektInstance._setParentPosition(pos.x, pos.y, pos.z);
        effektInstance.setPosition(
          effektInstance._localPosition[0],
          effektInstance._localPosition[1],
          effektInstance._localPosition[2]
        );

        const rot = group.current.rotation;
        effektInstance._setParentRotation(rot.x, rot.y, rot.z);
        effektInstance.setRotation(
          effektInstance._localRotation[0],
          effektInstance._localRotation[1],
          effektInstance._localRotation[2]
        );

        const scale = group.current.getWorldScale(worldScale.current);
        effektInstance._setParentScale(scale.x, scale.y, scale.z);
        effektInstance.setScale(
          effektInstance._localScale[0],
          effektInstance._localScale[1],
          effektInstance._localScale[2]
        );
      }
    });

    return (
      <group ref={group}>
        {debug ? (
          <mesh position={position} rotation={rotation} scale={scale}>
            <coneGeometry args={[1, 1, 6, 1]} />
            <meshBasicMaterial color={'#aa00ff'} wireframe={true} />
          </mesh>
        ) : null}
      </group>
    );
  }
);

// effekseer native type exports
export { effekseer };
export type { EffekseerContext, EffekseerEffect, EffekseerHandle };
