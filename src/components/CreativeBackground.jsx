import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, PerspectiveCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";

function FilmGate({ position, scale = 1, color = "#e63946", rotation = [0, 0, 0] }) {
  const points = useMemo(
    () => [
      [-1.65, -0.95, 0],
      [1.65, -0.95, 0],
      [1.65, 0.95, 0],
      [-1.65, 0.95, 0],
      [-1.65, -0.95, 0],
    ],
    []
  );

  return (
    <group position={position} scale={scale} rotation={rotation}>
      <Line points={points} color={color} lineWidth={1.4} transparent opacity={0.28} />
      <Line points={[[-1.65, 0, 0], [-1.15, 0, 0]]} color="#ffffff" lineWidth={0.8} transparent opacity={0.18} />
      <Line points={[[1.15, 0, 0], [1.65, 0, 0]]} color="#ffffff" lineWidth={0.8} transparent opacity={0.18} />
      <Line points={[[0, -0.95, 0], [0, -0.55, 0]]} color="#ffffff" lineWidth={0.8} transparent opacity={0.18} />
      <Line points={[[0, 0.55, 0], [0, 0.95, 0]]} color="#ffffff" lineWidth={0.8} transparent opacity={0.18} />
    </group>
  );
}

function TimelineTracks() {
  const group = useRef();
  const tracks = useMemo(
    () =>
      Array.from({ length: 32 }, (_, i) => ({
        x: -5.4 + (i % 8) * 1.55,
        y: -2.9 - Math.floor(i / 8) * 0.34,
        z: -3.6 - Math.floor(i / 8) * 0.38,
        width: 0.5 + ((i * 7) % 6) * 0.12,
        color: i % 5 === 0 ? "#7dd3fc" : i % 3 === 0 ? "#e9c46a" : "#e63946",
      })),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.position.x = Math.sin(state.clock.elapsedTime * 0.24) * 0.16;
  });

  return (
    <group ref={group} rotation={[-0.82, 0, 0.03]}>
      {tracks.map((track, i) => (
        <mesh key={i} position={[track.x, track.y, track.z]}>
          <boxGeometry args={[track.width, 0.045, 0.04]} />
          <meshBasicMaterial color={track.color} transparent opacity={0.32} toneMapped={false} />
        </mesh>
      ))}
      {[-3.05, -3.39, -3.73, -4.07].map((y) => (
        <Line
          key={y}
          points={[[-5.7, y, -3.75], [6.1, y, -3.75]]}
          color="#ffffff"
          lineWidth={0.5}
          transparent
          opacity={0.1}
        />
      ))}
    </group>
  );
}

function TrackingCloud() {
  const points = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => {
        const angle = i * 0.77;
        const radius = 1.8 + ((i * 13) % 18) * 0.08;
        return {
          position: [
            Math.cos(angle) * radius + ((i % 5) - 2) * 0.22,
            Math.sin(angle * 0.64) * 1.1 + ((i % 3) - 1) * 0.16,
            -2.4 + Math.sin(angle) * 0.72,
          ],
          color: i % 4 === 0 ? "#e9c46a" : i % 3 === 0 ? "#7dd3fc" : "#ffffff",
        };
      }),
    []
  );

  return (
    <group position={[2.9, 0.35, -1.8]} rotation={[0.15, -0.4, 0.12]}>
      {points.map((point, i) => (
        <mesh key={i} position={point.position}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshBasicMaterial color={point.color} transparent opacity={0.48} toneMapped={false} />
        </mesh>
      ))}
      {points.slice(0, 18).map((point, i) => (
        <Line
          key={`line-${i}`}
          points={[point.position, points[(i * 2 + 7) % points.length].position]}
          color="#7dd3fc"
          lineWidth={0.35}
          transparent
          opacity={0.08}
        />
      ))}
    </group>
  );
}

function VfxScene() {
  const rig = useRef();
  const heroShape = useRef();
  const scanLine = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (rig.current) {
      rig.current.rotation.y = Math.sin(t * 0.12) * 0.08;
      rig.current.position.y = Math.sin(t * 0.28) * 0.08;
    }
    if (heroShape.current) {
      heroShape.current.rotation.x = t * 0.13;
      heroShape.current.rotation.y = t * 0.18;
    }
    if (scanLine.current) {
      scanLine.current.position.y = -2.2 + ((t * 0.42) % 4.4);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.2, 6.4]} fov={48} />
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 5.5, 13]} />

      <group ref={rig}>
        <gridHelper args={[18, 42, "#e63946", "#343434"]} position={[0, -2.25, -4.2]} rotation={[0.14, 0, 0]} />
        <TimelineTracks />

        <Float speed={0.9} rotationIntensity={0.08} floatIntensity={0.16}>
          <group ref={heroShape} position={[-2.2, 0.35, -1.9]} rotation={[0.3, -0.28, 0.12]}>
            <mesh>
              <icosahedronGeometry args={[1.05, 2]} />
              <meshBasicMaterial color="#e63946" wireframe transparent opacity={0.12} toneMapped={false} />
            </mesh>
            <mesh scale={1.2}>
              <torusGeometry args={[1.05, 0.012, 8, 96]} />
              <meshBasicMaterial color="#e9c46a" transparent opacity={0.18} toneMapped={false} />
            </mesh>
          </group>
        </Float>

        <TrackingCloud />

        <FilmGate position={[0, 0.25, -2.7]} scale={1.42} color="#ffffff" />
        <FilmGate position={[-3.7, 1.2, -3.9]} scale={0.72} color="#e63946" rotation={[0.08, 0.38, -0.08]} />
        <FilmGate position={[3.8, -0.85, -4.2]} scale={0.86} color="#7dd3fc" rotation={[-0.04, -0.34, 0.06]} />

        <Line
          ref={scanLine}
          points={[[-5.8, 0, -2.05], [5.8, 0, -2.05]]}
          color="#e63946"
          lineWidth={1}
          transparent
          opacity={0.24}
        />
      </group>
    </>
  );
}

export default function CreativeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance", preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 6.4], fov: 48 }}
      >
        <VfxScene />
      </Canvas>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,5,0.68) 0%, rgba(5,5,5,0.24) 42%, rgba(5,5,5,0.78) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 6px, rgba(255,255,255,0.08) 7px)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.84)_86%)]" />
    </div>
  );
}
