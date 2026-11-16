
"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Center,
  ContactShadows,
  Bounds,
  OrbitControls,
} from "@react-three/drei";

function CarModel() {
  const { scene } = useGLTF("/models/scene.gltf");

  return (
    <Bounds fit clip observe margin={0.75}>
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

export default function Car3DViewer() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        camera={{
          position: [4, 2.5, 7],
          fov: 35,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
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

          <Environment preset="city" />

          <ContactShadows
            position={[0, -0.6, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
            resolution={512}
            color="#082F59"
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

useGLTF.preload("/models/scene.gltf");
