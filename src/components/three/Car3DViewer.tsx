
"use client";

import { Suspense, useState, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Center,
  ContactShadows,
  Bounds,
  Lightformer,
  OrbitControls,
} from "@react-three/drei";

// Phones: frame the car with more room so it stays fully on screen at every rotation angle
// (the side view is much longer than the default 3/4 front view).
const MOBILE_QUERY = "(max-width: 639px)";
const subscribeMobile = (onChange: () => void) => {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const useIsMobile = () =>
  useSyncExternalStore(subscribeMobile, () => window.matchMedia(MOBILE_QUERY).matches, () => false);

function CarModel() {
  const { scene } = useGLTF("/models/car.glb");
  const isMobile = useIsMobile();

  return (
    <Bounds key={isMobile ? "mobile" : "desktop"} fit clip observe margin={isMobile ? 1 : 0.75}>
      <Center>
        <group position={[0, -0.3, 0]}>
          <primitive object={scene} scale={1.4} />
        </group>
      </Center>
    </Bounds>
  );
}

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

/** How many times the canvas is rebuilt after the GPU drops the WebGL context and doesn't give it back. */
const MAX_REBUILDS = 1;

export default function Car3DViewer() {
  // Bumped to rebuild the <Canvas> (new WebGL context) when the GPU loses ours.
  const [attempt, setAttempt] = useState(0);

  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        key={attempt}
        onCreated={({ gl, invalidate }) => {
          // GPU reset / driver hiccup: three.js asks the browser to restore the context. If it comes back,
          // redraw; if not within 3 s, rebuild the canvas once. (A context the browser refuses to create
          // throws, and the hero's ErrorBoundary simply hides the car.)
          const canvas = gl.domElement;
          let timer = 0;
          canvas.addEventListener("webglcontextlost", () => {
            timer = window.setTimeout(() => setAttempt((a) => (a < MAX_REBUILDS ? a + 1 : a)), 3000);
          });
          canvas.addEventListener("webglcontextrestored", () => {
            window.clearTimeout(timer);
            invalidate();
          });
        }}
        camera={{
          position: [4, 2.5, 7],
          fov: 35,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          // "default" lets the browser pick the GPU. "high-performance" can force a GPU switch on laptops,
          // which itself causes WebGL context loss.
          powerPreference: "default",
        }}
        dpr={[1, 1.5]}
        // "percentage" = PCFShadowMap. The default ("soft" / PCFSoftShadowMap) was removed in three.js r18x,
        // which made three.js fall back to PCF anyway and log a warning.
        shadows="percentage"
        // Render only when something changes (model loaded, user drags) instead of 60×/second.
        // The car looks the same but the GPU stays free for the hero background videos.
        frameloop="demand"
      >
        <ambientLight intensity={1.4} />

        <directionalLight
          position={[5, 8, 5]}
          intensity={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <directionalLight
          position={[-5, 4, -5]}
          intensity={1}
        />

        <directionalLight
          position={[0, 5, 8]}
          intensity={0.7}
        />

        <Suspense fallback={<Loader />}>
          <CarModel />

          {/* Studio reflections built in the browser from light panels (rendered once) — replaces
              the "city" preset, a 1.5 MB HDR image downloaded from an external CDN on every visit. */}
          <Environment resolution={256} frames={1}>
            <Lightformer intensity={1.4} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
            <Lightformer intensity={1.4} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
            <Lightformer intensity={1.4} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
            <Lightformer intensity={1.4} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
            <Lightformer intensity={1.4} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
            <Lightformer intensity={1.4} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
            <Lightformer intensity={1.4} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
            <Lightformer form="ring" color="#dbeaff" intensity={4} scale={2} position={[10, 5, 10]} target={[0, 0, 0]} />
          </Environment>

          <ContactShadows
            position={[0, -0.6, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
            resolution={512}
            color="#0E1116"
          />

          {/* Manual Mouse / Touch Rotation Only */}
          <OrbitControls
            enableRotate={true}
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            rotateSpeed={0.8}
            minPolarAngle={Math.PI / 2.8}
            maxPolarAngle={Math.PI / 2.1}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/car.glb");
