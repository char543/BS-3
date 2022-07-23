import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

function Box(props) {
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
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <group>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <directionalLight color="white" intensity={0.5} position={[-1, 0, 1]} />
        <mesh
          {...props}
          ref={ref}
          scale={clicked ? 1.5 : 1}
          onClick={(event) => click(!clicked)}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            wireframe="false"
            map={texture}
            color={hovered ? "hotpink" : "blue"}
          />
        </mesh>
      </group>
    </>
  );
}

function Boxy(props) {
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
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <group>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <directionalLight color="white" intensity={0.5} position={[-1, 0, 1]} />
        <mesh
          {...props}
          ref={ref}
          scale={clicked ? 1.5 : 1}
          onClick={(event) => click(!clicked)}
          onPointerOver={(event) => hover(true)}
          onPointerOut={(event) => hover(false)}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            wireframe="false"
            map={texture}
            color={hovered ? "hotpink" : "blue"}
          />
        </mesh>
      </group>
    </>
  );
}

// export default Box;

function CanvasWrap() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Box />
        <Boxy position={(2, 2, 2)} />
      </Suspense>
    </Canvas>
  );
}

export default CanvasWrap;
