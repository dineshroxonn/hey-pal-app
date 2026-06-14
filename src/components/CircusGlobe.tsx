import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';

// India approx coordinates
const INDIA_LAT = 22;
const INDIA_LON = 79;

function latLonToVec3(lat: number, lon: number, radius = 2): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

function Globe({ zoomingToIndia }: { zoomingToIndia: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    // Align so India faces camera at +Z
    const [x, y, z] = latLonToVec3(INDIA_LAT, INDIA_LON, 1);
    targetRotation.current = {
      x: Math.asin(y),
      y: -Math.atan2(x, z),
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (zoomingToIndia) {
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.05;
    } else {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  const indiaPos = latLonToVec3(INDIA_LAT, INDIA_LON, 2.02);

  return (
    <group ref={groupRef}>
      {/* Earth sphere (poster-circus tinted) */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#1a0a0a"
          emissive="#3a0a0a"
          emissiveIntensity={0.25}
          roughness={0.85}
          metalness={0.3}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh>
        <sphereGeometry args={[2.005, 32, 32]} />
        <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.18} />
      </mesh>
      {/* India spotlight marker */}
      <mesh position={indiaPos}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#fbbf24" />
      </mesh>
      <mesh position={indiaPos}>
        <ringGeometry args={[0.1, 0.16, 32]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

interface CircusGlobeProps {
  onComplete: () => void;
}

export default function CircusGlobe({ onComplete }: CircusGlobeProps) {
  const [zoom, setZoom] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setZoom(true), 1500);
    const t2 = setTimeout(() => setFadeOut(true), 4200);
    const t3 = setTimeout(() => onComplete(), 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const skip = () => {
    setFadeOut(true);
    setTimeout(onComplete, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black transition-opacity duration-700 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <Canvas camera={{ position: [0, 0, zoom ? 3.2 : 6], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 3, 5]} intensity={1.5} color="#fbbf24" />
        <pointLight position={[-5, -3, -5]} intensity={0.6} color="#ef4444" />
        <Suspense fallback={null}>
          <Stars radius={50} depth={50} count={3000} factor={4} fade speed={1} />
          <Globe zoomingToIndia={zoom} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Suspense>
      </Canvas>

      {/* Overlay copy */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-20 text-center px-4">
        <h1 className="text-4xl md:text-7xl circus-title text-yellow-400 mb-3 animate-flicker">
          The Great Indian Circus
        </h1>
        <p className="text-yellow-200 italic text-base md:text-xl max-w-2xl">
          Spotlight, please... we're zooming into the greatest show on earth.
        </p>
      </div>

      <Button
        variant="ghost"
        onClick={skip}
        className="absolute top-6 right-6 text-yellow-300 hover:text-yellow-400 hover:bg-red-900/30 z-10"
      >
        Skip intro →
      </Button>
    </div>
  );
}
