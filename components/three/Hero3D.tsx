"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mulberry32 } from "@/lib/utils";

const COUNT = 2400;
const RADIUS = 3.6;
const BRANCHES = 4;
const SPIN = 1.1;
const RANDOMNESS = 0.45;
const RANDOMNESS_POWER = 3;
const INSIDE_COLOR = "#fde2ec";
const OUTSIDE_COLOR = "#4a1a42";

function useGalaxyGeometry() {
  return useMemo(() => {
    const rand = mulberry32(7);
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const colorInside = new THREE.Color(INSIDE_COLOR);
    const colorOutside = new THREE.Color(OUTSIDE_COLOR);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const r = rand() * RADIUS;
      const spinAngle = r * SPIN;
      const branchAngle = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;

      const randomX = Math.pow(rand(), RANDOMNESS_POWER) * (rand() < 0.5 ? 1 : -1) * RANDOMNESS * r;
      const randomY = Math.pow(rand(), RANDOMNESS_POWER) * (rand() < 0.5 ? 1 : -1) * RANDOMNESS * r * 0.35;
      const randomZ = Math.pow(rand(), RANDOMNESS_POWER) * (rand() < 0.5 ? 1 : -1) * RANDOMNESS * r;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      const mixedColor = colorInside.clone().lerp(colorOutside, r / RADIUS);
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, []);
}

// Soft round sprite so points read as glowing dots rather than hard squares.
function useDotTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
}

function Galaxy({ mouse }: { mouse: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors } = useGalaxyGeometry();
  const dotTexture = useDotTexture();

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x += (mouse.y * 0.12 + 0.55 - pointsRef.current.rotation.x) * 0.02;
    pointsRef.current.rotation.z += (mouse.x * 0.06 - pointsRef.current.rotation.z) * 0.02;
  });

  return (
    // Offset so the brighter core sits off to the side, away from the
    // headline column, instead of glowing directly behind the hero text.
    <points ref={pointsRef} position={[2.1, 0.4, -1.6]} rotation={[0.55, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        map={dotTexture}
        alphaMap={dotTexture}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
        transparent
        opacity={0.4}
      />
    </points>
  );
}

export function Hero3D({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <Canvas camera={{ position: [0, 1.8, 6.2], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <Galaxy mouse={mouse} />
    </Canvas>
  );
}
