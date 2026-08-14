"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function HeroObject({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += (mouse.y * 0.3 - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (mouse.x * 0.3 - meshRef.current.rotation.y) * 0.02;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.1}>
      <Sphere ref={meshRef} args={[1.4, 120, 200]}>
        <MeshDistortMaterial
          color="#935a52"
          attach="material"
          distort={0.4}
          speed={1.6}
          roughness={0.15}
          metalness={0.75}
          emissive="#59171b"
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  );
}

export function Hero3D({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={1.3} color="#fed7b8" />
      <pointLight position={[-4, -2, -2]} intensity={0.5} color="#f2ba8c" />
      <pointLight position={[3, -3, 2]} intensity={0.25} color="#fed7b8" />
      <HeroObject mouse={mouse} />
    </Canvas>
  );
}
