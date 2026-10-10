import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  Torus,
  Sphere,
} from "@react-three/drei";
import { useRef } from "react";

/* --------------------------------
   3D HEALING OBJECT
--------------------------------- */

function HealingObject() {
  const group = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (group.current) {
      group.current.rotation.y = time * 0.15;
      group.current.rotation.x = Math.sin(time * 0.5) * 0.08;
    }
  });

  return (
    <group ref={group}>

      {/* Main golden sphere */}
      <Sphere args={[1.35, 64, 64]}>
        <meshPhysicalMaterial
          color="#b79b58"
          roughness={0.18}
          metalness={0.25}
          transmission={0.25}
          thickness={1}
        />
      </Sphere>

      {/* Inner glowing sphere */}
      <Sphere args={[0.85, 48, 48]}>
        <meshStandardMaterial
          color="#e2cc8a"
          emissive="#8c7135"
          emissiveIntensity={1.5}
          roughness={0.2}
        />
      </Sphere>

      {/* First energy ring */}
      <Torus
        args={[1.9, 0.025, 16, 100]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color="#d4bd78"
          emissive="#9e843d"
          emissiveIntensity={1}
        />
      </Torus>

      {/* Second energy ring */}
      <Torus
        args={[2.25, 0.018, 16, 100]}
        rotation={[Math.PI / 2.5, 0.4, 0]}
      >
        <meshStandardMaterial
          color="#a98b4d"
          emissive="#705b2e"
          emissiveIntensity={0.8}
        />
      </Torus>

      {/* Third energy ring */}
      <Torus
        args={[2.6, 0.012, 16, 100]}
        rotation={[0.5, 0.2, 0]}
      >
        <meshStandardMaterial
          color="#c9b06d"
          emissive="#75602f"
          emissiveIntensity={0.7}
        />
      </Torus>

    </group>
  );
}


/* --------------------------------
   THREE.JS SCENE
--------------------------------- */

function Scene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 7],
        fov: 45,
      }}
      dpr={[1, 1.5]}
    >

      {/* Base lighting */}
      <ambientLight intensity={1.5} />

      {/* Main light */}
      <directionalLight
        position={[4, 5, 5]}
        intensity={3}
      />

      {/* Secondary light */}
      <pointLight
        position={[-4, 2, 3]}
        intensity={3}
        distance={10}
      />

      {/* Floating 3D object */}
      <Float
        speed={1.5}
        rotationIntensity={0.2}
        floatIntensity={0.5}
      >
        <HealingObject />
      </Float>

      {/* Background particles */}
      <Sparkles
        count={55}
        scale={7}
        size={2}
        speed={0.3}
      />

    </Canvas>
  );
}


/* --------------------------------
   HERO 3D COMPONENT
--------------------------------- */

function HeroScene() {
  return (
    <div className="hero-scene-canvas">
      <Scene />
    </div>
  );
}

export default HeroScene;