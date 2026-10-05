"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import * as THREE from "three";
import type { LabModel, PartMaterial } from "@/data/models";
import { assetUrl } from "@/lib/asset";

interface Props {
  model: LabModel;
  hint: string;
  loadingLabel: string;
  resetLabel: string;
  fullscreenLabel: string;
  wireframeLabel: string;
  transparentLabel: string;
  /** mini 360-spin preview: auto-rotates, hides the control bar */
  preview?: boolean;
  hideFullscreen?: boolean;
}

/* Glacier workshop palette: machined metals + cool slate. No neon, no brown. */
const MATERIALS: Record<PartMaterial, { color: number; metalness: number; roughness: number }> = {
  aluminum: { color: 0xb9c0cb, metalness: 0.85, roughness: 0.35 },
  graphite: { color: 0x30343c, metalness: 0.6, roughness: 0.5 },
  slate: { color: 0x4a6fa5, metalness: 0.45, roughness: 0.4 },
  shell: { color: 0xd9dee6, metalness: 0.1, roughness: 0.55 },
  steel: { color: 0x8f96a1, metalness: 0.9, roughness: 0.3 },
};

const PRESENTATION: Record<string, { camera: [number, number, number]; targetY: number }> = {
  "airo-speedboat": { camera: [2.9, 1.9, 3.7], targetY: 0.8 },
  "manly-balzer": { camera: [2.7, 1.9, 3.5], targetY: 1.0 },
  "aqua-fly": { camera: [2.9, 2.1, 3.4], targetY: 0.8 },
};

export function ModelViewer({
  model,
  hint,
  loadingLabel,
  resetLabel,
  fullscreenLabel,
  wireframeLabel,
  transparentLabel,
  preview = false,
  hideFullscreen = false,
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{
    reset: () => void;
    toggleFullscreen: () => void;
    setWireframe: (v: boolean) => void;
    setTransparent: (v: boolean) => void;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [wire, setWire] = useState(false);
  const [trans, setTrans] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let disposed = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let raf = 0;
    const mount = mountRef.current;
    const spin = preview && !reduce;

    (async () => {
      try {
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
        const { STLLoader } = await import("three/examples/jsm/loaders/STLLoader.js");
        if (disposed || !mount) return;
        const w = mount.clientWidth || 800;
        const h = mount.clientHeight || 520;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, preview ? 1.5 : 2));
        renderer.setSize(w, h);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        mount.appendChild(renderer.domElement);
        renderer.domElement.setAttribute("role", "img");
        renderer.domElement.setAttribute("aria-label", `${model.title} — interactive 3D. ${hint}`);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
        const pres = PRESENTATION[model.id] ?? { camera: [4, 2.6, 5] as [number, number, number], targetY: 0.7 };
        camera.position.set(...pres.camera);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.minDistance = 2.0;
        controls.maxDistance = 14;
        controls.maxPolarAngle = Math.PI * 0.55;
        controls.target.set(0, pres.targetY, 0);
        controls.autoRotate = spin;
        controls.autoRotateSpeed = 1.8;

        // Cool neutral studio light
        scene.add(new THREE.HemisphereLight(0xeef1f6, 0x2e3238, 0.9));
        const key = new THREE.DirectionalLight(0xffffff, 2.2);
        key.position.set(4, 7, 3);
        key.castShadow = true;
        key.shadow.mapSize.set(2048, 2048);
        key.shadow.camera.left = -6;
        key.shadow.camera.right = 6;
        key.shadow.camera.top = 6;
        key.shadow.camera.bottom = -6;
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xcdd8ea, 0.9);
        rim.position.set(-5, 3, -4);
        scene.add(rim);

        // Floor: cool slate disc + faint grid
        const floor = new THREE.Mesh(
          new THREE.CircleGeometry(7, 64),
          new THREE.MeshStandardMaterial({ color: 0x99a2b1, roughness: 0.95, metalness: 0 })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);
        const grid = new THREE.GridHelper(12, 24, 0x5b6b8c, 0x39424f);
        (grid.material as THREE.Material).transparent = true;
        (grid.material as THREE.Material).opacity = 0.3;
        grid.position.y = 0.01;
        scene.add(grid);

        const stage = new THREE.Group();
        scene.add(stage);

        const matFor = (m: PartMaterial) => {
          const p = MATERIALS[m];
          return new THREE.MeshStandardMaterial({ color: p.color, metalness: p.metalness, roughness: p.roughness });
        };

        // Load the real CAD parts, then repeated modules at measured corners.
        const loader = new STLLoader();
        const pivot = model.instancePivot
          ? new THREE.Vector3(...model.instancePivot)
          : new THREE.Vector3();
        const geos = await Promise.all(
          model.parts.map((p) => loader.loadAsync(assetUrl(p.path)))
        );
        if (disposed) return;
        model.parts.forEach((p, i) => {
          const geo = geos[i];
          const mesh = new THREE.Mesh(geo, matFor(p.material));
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          stage.add(mesh);
          for (const inst of (model.instances ?? []).filter((s) => s.part === i)) {
            const dup = new THREE.Mesh(geo, matFor(p.material));
            dup.castShadow = true;
            dup.receiveShadow = true;
            dup.position.set(inst.at[0] - pivot.x, inst.at[1] - pivot.y, inst.at[2] - pivot.z);
            if (inst.ry) dup.rotation.y = inst.ry;
            stage.add(dup);
          }
        });

        // Normalise: center on XZ, sit on the floor, scale to ~2.6 units.
        const bbox = new THREE.Box3().setFromObject(stage);
        const center = new THREE.Vector3();
        bbox.getCenter(center);
        const size = new THREE.Vector3();
        bbox.getSize(size);
        const fit = new THREE.Group();
        fit.add(stage);
        stage.position.set(-center.x, -bbox.min.y, -center.z);
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        fit.scale.setScalar(2.6 / maxDim);
        scene.add(fit);
        setLoading(false);

        const onResize = () => {
          if (!mount || !renderer) return;
          const nw = mount.clientWidth;
          const nh = mount.clientHeight;
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw, nh);
        };
        window.addEventListener("resize", onResize);

        const tick = () => {
          if (disposed) return;
          raf = requestAnimationFrame(tick);
          controls.update();
          renderer!.render(scene, camera);
        };
        tick();

        apiRef.current = {
          reset: () => {
            camera.position.set(...pres.camera);
            controls.target.set(0, pres.targetY, 0);
            controls.update();
          },
          toggleFullscreen: () => {
            const el = mountRef.current;
            if (!el) return;
            if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
            else el.requestFullscreen?.().catch(() => {});
          },
          setWireframe: (v: boolean) => {
            fit.traverse((o) => {
              const mesh = o as THREE.Mesh;
              const mat = mesh.material as THREE.MeshStandardMaterial | undefined;
              if (mesh.isMesh && mat && "wireframe" in mat) mat.wireframe = v;
            });
          },
          setTransparent: (v: boolean) => {
            fit.traverse((o) => {
              const mesh = o as THREE.Mesh;
              const mat = mesh.material as THREE.MeshStandardMaterial | undefined;
              if (mesh.isMesh && mat && "opacity" in mat) {
                if (v) {
                  mat.userData._op = mat.opacity;
                  mat.transparent = true;
                  mat.opacity = 0.45;
                } else if (mat.userData._op !== undefined) {
                  mat.opacity = mat.userData._op;
                  if (mat.opacity >= 1) mat.transparent = false;
                }
              }
            });
          },
        };

        return () => {
          window.removeEventListener("resize", onResize);
        };
      } catch {
        if (!disposed) {
          setFailed(true);
          setLoading(false);
        }
      }
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      apiRef.current = null;
      if (renderer) {
        renderer.dispose();
        renderer.domElement.parentElement?.removeChild(renderer.domElement);
        renderer = null;
      }
      if (mount) mount.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model.id, preview]);

  return (
    <div className={`viewer${preview ? " is-preview" : ""}`}>
      <div ref={mountRef} className="viewer-canvas" aria-busy={loading} />
      {loading ? (
        <div className="viewer-loading" role="status">
          <span className="mono">{loadingLabel}</span>
          <span className="viewer-bar" aria-hidden="true">
            <i />
          </span>
        </div>
      ) : null}
      {failed && !loading ? (
        <p className="notice" role="alert">
          3D unavailable in this browser — the download files below still carry the full geometry.
        </p>
      ) : null}
      {!preview ? (
        <div className="viewer-bar-row">
          <p className="viewer-hint">{hint}</p>
          <div className="viewer-controls" role="group" aria-label="Model controls">
            <button type="button" onClick={() => apiRef.current?.reset()} aria-label={resetLabel}>
              {resetLabel}
            </button>
            <button
              type="button"
              aria-pressed={wire}
              onClick={() => {
                const v = !wire;
                setWire(v);
                apiRef.current?.setWireframe(v);
              }}
            >
              {wireframeLabel}
            </button>
            <button
              type="button"
              aria-pressed={trans}
              onClick={() => {
                const v = !trans;
                setTrans(v);
                apiRef.current?.setTransparent(v);
              }}
            >
              {transparentLabel}
            </button>
            {!hideFullscreen ? (
              <button type="button" onClick={() => apiRef.current?.toggleFullscreen()}>
                {fullscreenLabel}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
