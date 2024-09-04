// src/App.jsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Vehicle from './components/Vehicle'
import FallingShapes from './components/FallingShapes'

function App() {
  return (
    <div className="h-screen">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <OrbitControls />
        <Environment preset="sunset" />
        
        <Physics>
          <Vehicle />
          <FallingShapes />

          {/* Ground */}
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="green" />
          </mesh>
        </Physics>
      </Canvas>
    </div>
  )
}

export default App
