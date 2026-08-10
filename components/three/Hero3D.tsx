"use client";

import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";

export function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 2, 2]} intensity={1.5} color="#E5F2C9" />
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <Sphere args={[1.5, 100, 200]}>
          <MeshDistortMaterial
            color="#8C705F"
            attach="material"
            distort={0.5}
            speed={2}
            roughness={0.15}
            metalness={0.7}
            emissive="#7F534B"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </Float>
    </Canvas>
  );
}