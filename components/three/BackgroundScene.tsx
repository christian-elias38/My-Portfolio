"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function AmbientOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.x = Math.sin(t * 0.3) * 1.4;
    ref.current.position.y = Math.cos(t * 0.25) * 0.9;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <Sphere ref={ref} args={[1.2, 64, 64]} position={[-2.5, 1.5, -2]}>
        <MeshDistortMaterial
          color="#8C705F"
          attach="material"
          distort={0.35}
          speed={1.5}
          roughness={0.4}
          metalness={0.3}
          transparent
          opacity={0.35}
        />
      </Sphere>
    </Float>
  );
}

function SecondaryOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.x = Math.cos(t * 0.35) * 1.1;
    ref.current.position.y = Math.sin(t * 0.3) * 0.8;
  });
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.8}>
      <Sphere ref={ref} args={[0.8, 48, 48]} position={[2.8, -1.2, -2.5]}>
        <MeshDistortMaterial
          color="#7F534B"
          attach="material"
          distort={0.4}
          speed={1}
          roughness={0.5}
          metalness={0.2}
          transparent
          opacity={0.25}
        />
      </Sphere>
    </Float>
  );
}

function GridLines() {
  const ref = useRef<THREE.LineSegments>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * 0.02;
  });
  const points: THREE.Vector3[] = [];
  const size = 12;
  const divisions = 18;
  const step = size / divisions;
  for (let i = -divisions / 2; i <= divisions / 2; i++) {
    points.push(new THREE.Vector3(i * step, -size / 2, -3));
    points.push(new THREE.Vector3(i * step, size / 2, -3));
    points.push(new THREE.Vector3(-size / 2, i * step, -3));
    points.push(new THREE.Vector3(size / 2, i * step, -3));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <lineSegments ref={ref} geometry={geo}>
      <lineBasicMaterial color="#8C705F" transparent opacity={0.08} />
    </lineSegments>
  );
}

export function BackgroundScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="fixed inset-0 -z-30"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 2]} intensity={0.8} color="#E5F2C9" />
      <GridLines />
      <AmbientOrb />
      <SecondaryOrb />
    </Canvas>
  );
}
