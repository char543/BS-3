import React, { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

// Spinning Box / Mesh 1 function (MESH STANDARD) (BOX GEO) -------------------
function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <group>
        <mesh
          {...props}
          ref={ref}
          scale={clicked ? 1.5 : 1}
          onClick={(event) => click(!clicked)}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}
        >
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            wireframe="false"
            color={hovered ? "hotpink" : "blue"}
          />
        </mesh>
      </group>
    </>
  );
}
// Second Mesh, Smoke Texture function (MESH STANDARD) (PLANE GEO) (Transparent) ---------------------
function Smoke(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  // define variable for useTexture
  const texture = useTexture(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png"
  );
  // PARTICLES SECTION! MATHS!
  const particles = useMemo(() => {
    const cloudParticles = [];
    for (let p = 0; p < 150; p++) {
      const positionX = Math.random() * 800 - 400;
      const positionZ = Math.random() * 500 - 500;
      const rotationZ = Math.random() * 2 * Math.PI;

      cloudParticles.push({
        positionX,
        positionZ,
        rotationZ,
      });
    }
    return cloudParticles;
  }, []);

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <group>
        <mesh
          {...props}
          ref={ref}
          scale={clicked ? 1.5 : 1}
          onClick={(event) => click(!clicked)}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}
        >
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial
            wireframe="false"
            map={texture}
            color={hovered ? "hotpink" : "blue"}
            transparent="true"
          />
        </mesh>
      </group>
    </>
  );
}

// Final wrapper function to wrap above components into single canvasWrap component. Why :(
function CanvasWrap() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <directionalLight color="white" intensity={0.5} position={[-1, 0, 1]} />
      <Suspense fallback={null}>
        <Box />
        <Smoke position={(0, 0, 1)} />
      </Suspense>
    </Canvas>
  );
}

export default CanvasWrap;
