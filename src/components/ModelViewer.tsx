"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { LabModel } from "@/data/models";
import { assetUrl } from "@/lib/asset";

interface Props {
  model: LabModel;
  hint: string;
  loadingLabel: string;
  resetLabel: string;
  fullscreenLabel: string;
  wireframeLabel: string;
  transparentLabel: string;
}

interface Presentation {
  camera: [number, number, number];
  targetY: number;
  rotation?: [number, number, number];
  lift?: number;
  lifebuoy?: boolean;
}

// Per-model staging: closer cameras, grounded floats, upright engine, lifebuoy.
const PRESENTATION: Record<string, Presentation> = {
  "airo-speedboat": {
    camera: [2.9, 1.9, 3.7],
    targetY: 1.0,
    lift: 0.3,
  },
  "manly-balzer": {
    camera: [2.7, 1.9, 3.5],
    targetY: 0.9,
    // CAD star lies flat (XZ plane) — stand it upright like a museum engine,
    // with a slight in-plane turn for a lively 3/4 view.
    rotation: [Math.PI / 2, 0, 0.45],
  },
  "aqua-fly": {
    camera: [2.7, 2.1, 3.2],
    targetY: 1.2,
    rotation: [0, 0.6, 0],
    lift: 0.9,
    lifebuoy: true,
  },
};

export function ModelViewer({
  model,
  hint,
  loadingLabel,
  resetLabel,
  fullscreenLabel,
  wireframeLabel,
  transparentLabel,
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

  useEffect(() => {
    let disposed = false;
    let renderer: THREE.WebGLRenderer | null = null;
    let raf = 0;
    const mount = mountRef.current;
    const modelId = model.id;
    void modelId;

    (async () => {
      try {
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
        if (disposed || !mount) return;
        const w = mount.clientWidth || 800;
        const h = mount.clientHeight || 520;

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.05;
        mount.appendChild(renderer.domElement);
        renderer.domElement.setAttribute("role", "img");
        renderer.domElement.setAttribute(
          "aria-label",
          `${model.title} — interactive 3D. ${hint}`
        );

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
        const pres: Presentation = PRESENTATION[model.id] ?? {
          camera: [4, 2.6, 5],
          targetY: 0.7,
        };
        camera.position.set(...pres.camera);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.minDistance = 2.2;
        controls.maxDistance = 14;
        controls.maxPolarAngle = Math.PI * 0.52;
        controls.target.set(0, pres.targetY, 0);

        // Studio lighting — neutral, museum-like
        scene.add(new THREE.HemisphereLight(0xf5f1e6, 0x2a2a28, 0.9));
        const key = new THREE.DirectionalLight(0xfff6e8, 2.2);
        key.position.set(4, 7, 3);
        key.castShadow = true;
        key.shadow.mapSize.set(2048, 2048);
        key.shadow.camera.left = -6;
        key.shadow.camera.right = 6;
        key.shadow.camera.top = 6;
        key.shadow.camera.bottom = -6;
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xdfe8f0, 0.9);
        rim.position.set(-5, 3, -4);
        scene.add(rim);

        // Floor: soft disc + shadow catcher + faint grid
        const floor = new THREE.Mesh(
          new THREE.CircleGeometry(7, 64),
          new THREE.MeshStandardMaterial({ color: 0xd8d2c2, roughness: 0.95, metalness: 0 })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        scene.add(floor);
        const grid = new THREE.GridHelper(12, 24, 0x8a857a, 0xb9b2a2);
        (grid.material as THREE.Material).transparent = true;
        (grid.material as THREE.Material).opacity = 0.28;
        grid.position.y = 0.01;
        scene.add(grid);

        const root = new THREE.Group();
        scene.add(root);

        const std = (color: number, roughness = 0.55, metalness = 0.35) =>
          new THREE.MeshStandardMaterial({ color, roughness, metalness });
        const shadowed = (m: THREE.Mesh) => {
          m.castShadow = true;
          m.receiveShadow = true;
          return m;
        };

        function buildSpeedboat(g: THREE.Group) {
          const hullMat = std(0x2b2e33, 0.42, 0.5);
          const deckMat = std(0xefe9da, 0.7, 0.05);
          const bronzeMat = std(0x8a6b3f, 0.35, 0.8);
          const glassMat = new THREE.MeshStandardMaterial({
            color: 0x9fb3c0,
            roughness: 0.15,
            metalness: 0.1,
            transparent: true,
            opacity: 0.55,
          });
          const hull = shadowed(new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.55, 3.2), hullMat));
          hull.position.y = 0.62;
          g.add(hull);
          const bow = shadowed(
            new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.85, 1.5, 4, 1), hullMat)
          );
          bow.rotation.x = -Math.PI / 2;
          bow.rotation.y = Math.PI / 4;
          bow.scale.set(1, 1, 0.42);
          bow.position.set(0, 0.62, 2.3);
          g.add(bow);
          const deck = shadowed(new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.12, 2.5), deckMat));
          deck.position.set(0, 0.95, -0.2);
          g.add(deck);
          const stripe = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.07, 3.0), bronzeMat);
          stripe.position.set(0, 0.72, 0);
          g.add(stripe);
          const shield = shadowed(new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.42, 0.08), glassMat));
          shield.position.set(0, 1.3, 0.55);
          shield.rotation.x = -0.28;
          g.add(shield);
          for (const x of [-0.38, 0.38]) {
            const seat = shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.5), std(0x3a3a36, 0.8, 0.1)));
            seat.position.set(x, 1.15, -0.45);
            g.add(seat);
          }
          const motor = shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.4), std(0x1e1e1c, 0.5, 0.6)));
          motor.position.set(0, 0.75, -1.95);
          g.add(motor);
          // waterline disc
          const water = new THREE.Mesh(
            new THREE.CircleGeometry(4.4, 48),
            new THREE.MeshStandardMaterial({ color: 0x7e97a3, roughness: 0.35, metalness: 0.1, transparent: true, opacity: 0.5 })
          );
          water.rotation.x = -Math.PI / 2;
          water.position.y = 0.32;
          g.add(water);
        }

        function buildEngine(g: THREE.Group) {
          const iron = std(0x33322e, 0.6, 0.55);
          const steel = std(0x9a978e, 0.35, 0.85);
          const brass = std(0x8a6b3f, 0.3, 0.9);
          const copper = std(0x7d5233, 0.4, 0.85);
          const base = shadowed(new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.18, 1.9), std(0x4a463d, 0.8, 0.15)));
          base.position.y = 0.09;
          g.add(base);
          const plinth = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.7, 0.9, 24), std(0x6b675c, 0.85, 0.1)));
          plinth.position.y = 0.6;
          g.add(plinth);
          const eng = new THREE.Group();
          eng.position.y = 1.75;
          g.add(eng);
          const crank = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.5, 24), iron));
          crank.rotation.x = Math.PI / 2;
          eng.add(crank);
          const hubRing = shadowed(new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.045, 12, 32), brass));
          eng.add(hubRing);
          for (let i = 0; i < 5; i++) {
            const ang = (i / 5) * Math.PI * 2 - Math.PI / 2;
            const cyl = new THREE.Group();
            const dir = new THREE.Vector3(Math.cos(ang), Math.sin(ang), 0);
            cyl.position.copy(dir.clone().multiplyScalar(0.62));
            cyl.rotation.z = ang - Math.PI / 2;
            const barrel = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.13, 0.72, 16), iron));
            barrel.position.y = 0.36;
            cyl.add(barrel);
            for (let f = 0; f < 5; f++) {
              const fin = new THREE.Mesh(new THREE.CylinderGeometry(0.165, 0.165, 0.03, 16), steel);
              fin.position.y = 0.12 + f * 0.13;
              cyl.add(fin);
            }
            const head = shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.14, 0.24), brass));
            head.position.y = 0.78;
            cyl.add(head);
            const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.7, 8), copper);
            rod.position.set(0.14, 0.35, 0);
            cyl.add(rod);
            eng.add(cyl);
          }
          // water jacket ring (copper, partial)
          const jacket = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.035, 10, 40, Math.PI * 1.5), copper);
          jacket.position.z = 0.12;
          eng.add(jacket);
          const prop = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, 0.5, 12), steel));
          prop.rotation.x = Math.PI / 2;
          prop.position.z = 0.5;
          eng.add(prop);
        }

        // Lifebuoy ring displayed under the drone (rescue payload staging).
        function buildLifebuoy(g: THREE.Group) {
          const orange = std(0xc65a24, 0.55, 0.15);
          const white = std(0xe8e2d4, 0.6, 0.05);
          const ring = shadowed(new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.19, 18, 44), orange));
          ring.rotation.x = Math.PI / 2;
          ring.position.y = 0.32;
          g.add(ring);
          for (let i = 0; i < 4; i++) {
            const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
            const strap = shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.42, 0.1), white));
            strap.position.set(Math.cos(a) * 0.62, 0.32, Math.sin(a) * 0.62);
            strap.rotation.y = -a;
            g.add(strap);
          }
        }

        function buildDrone(g: THREE.Group) {
          const frame = std(0x2e2f31, 0.5, 0.55);
          const light = std(0xe9e2d2, 0.7, 0.1);
          const solar = std(0x2c3a4a, 0.35, 0.7);
          const buoy = std(0xa86a3c, 0.6, 0.2);
          g.position.y = 0.55;
          const body = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.68, 0.36, 6), frame));
          body.position.y = 0.9;
          g.add(body);
          const panel = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.035, 6), solar));
          panel.position.y = 1.1;
          g.add(panel);
          const belly = shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.22, 0.6), light));
          belly.position.set(0, 0.66, 0.1);
          g.add(belly);
          // camera gimbal
          const cam = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 16), std(0x1c1c1c, 0.4, 0.6)));
          cam.position.set(0, 0.5, 0.42);
          g.add(cam);
          // rescue buoy ring below
          const ring = shadowed(new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.11, 14, 28), buoy));
          ring.rotation.x = Math.PI / 2;
          ring.position.y = 0.28;
          g.add(ring);
          // 6 arms + motors + props + floats
          for (let i = 0; i < 6; i++) {
            const ang = (i / 6) * Math.PI * 2;
            const arm = shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.09, 1.05), frame));
            arm.position.set(Math.sin(ang) * 0.85, 0.95, Math.cos(ang) * 0.85);
            arm.rotation.y = ang;
            g.add(arm);
            const mx = Math.sin(ang) * 1.32;
            const mz = Math.cos(ang) * 1.32;
            const motor = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.16, 14), steelish()));
            motor.position.set(mx, 1.02, mz);
            g.add(motor);
            const prop = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.02, 0.09), std(0x44443f, 0.6, 0.3));
            prop.position.set(mx, 1.12, mz);
            prop.rotation.y = ang + 0.5;
            g.add(prop);
          }
          function steelish() {
            return std(0x8f8c83, 0.4, 0.8);
          }
          // floats
          for (const x of [-0.55, 0.55]) {
            const fl = shadowed(
              new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 1.1, 6, 12), light)
            );
            fl.rotation.x = Math.PI / 2;
            fl.position.set(x, 0.12, 0);
            g.add(fl);
          }
        }

        // Try external GLB first; fall back to procedural concept on any failure.
        let settled = false;
        const finish = () => {
          if (settled || disposed) return;
          settled = true;
          setLoading(false);
        };
        try {
          const loader = new GLTFLoader();
          const gltf: THREE.Group = await new Promise((resolve, reject) => {
            loader.load(
              assetUrl(model.modelPath),
              (res) => resolve(res.scene as unknown as THREE.Group),
              undefined,
              () => reject(new Error("glb-missing")),
            );
            setTimeout(() => reject(new Error("timeout")), 4500);
          });
          if (disposed) return;
          // normalise scale to ~2.6 units, stage upright, sit on the floor
          const inner = new THREE.Group();
          inner.add(gltf);
          if (pres.rotation) inner.rotation.set(...pres.rotation);
          const bbox = new THREE.Box3().setFromObject(gltf);
          const size = new THREE.Vector3();
          bbox.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          const s = 2.6 / maxDim;
          gltf.scale.setScalar(s);
          gltf.traverse((o) => {
            const mesh = o as THREE.Mesh;
            if (mesh.isMesh) {
              mesh.castShadow = true;
              mesh.receiveShadow = true;
            }
          });
          // ground the rotated model on the floor, then apply display lift
          const stage = new THREE.Box3().setFromObject(inner);
          const c = new THREE.Vector3();
          stage.getCenter(c);
          inner.position.set(-c.x, -stage.min.y + (pres.lift ?? 0), -c.z);
          root.add(inner);
          if (pres.lifebuoy) buildLifebuoy(root);
          finish();
        } catch {
          if (disposed) return;
          try {
            if (model.id === "airo-speedboat") buildSpeedboat(root);
            else if (model.id === "manly-balzer") buildEngine(root);
            else buildDrone(root);
          } catch {
            setFailed(true);
          }
          finish();
        }

        const onResize = () => {
          if (!mount || !renderer) return;
          const nw = mount.clientWidth;
          const nh = mount.clientHeight;
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw, nh);
        };
        window.addEventListener("resize", onResize);

        const clock = new THREE.Clock();
        let interacting = false;
        controls.addEventListener("start", () => {
          interacting = true;
        });
        controls.addEventListener("end", () => {
          interacting = false;
        });
        const tick = () => {
          if (disposed) return;
          raf = requestAnimationFrame(tick);
          const t = clock.getElapsedTime();
          // gentle idle motion only when user is not interacting
          if (!interacting) root.rotation.y += 0.0016;
          void t;
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
            root.traverse((o) => {
              const mesh = o as THREE.Mesh;
              const mat = mesh.material as THREE.MeshStandardMaterial | undefined;
              if (mesh.isMesh && mat && "wireframe" in mat) mat.wireframe = v;
            });
          },
          setTransparent: (v: boolean) => {
            root.traverse((o) => {
              const mesh = o as THREE.Mesh;
              const mat = mesh.material as THREE.MeshStandardMaterial | undefined;
              if (mesh.isMesh && mat && "opacity" in mat) {
                mat.transparent = v ? true : mat.opacity !== 1 ? true : false;
                if (v) {
                  mat.userData._op = mat.opacity;
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
  }, [model.id]);

  return (
    <div className="viewer">
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
          3D unavailable in this browser — the technical notes below still describe the study.
        </p>
      ) : null}
      <div className="viewer-bar-row">
        <p className="viewer-hint">{hint}</p>
        <div className="viewer-controls" role="group" aria-label="Model controls">
          <button
            type="button"
            onClick={() => apiRef.current?.reset()}
            aria-label={resetLabel}
          >
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
          <button type="button" onClick={() => apiRef.current?.toggleFullscreen()}>
            {fullscreenLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
