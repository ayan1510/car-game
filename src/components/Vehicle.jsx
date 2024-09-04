// src/components/Vehicle.jsx
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { Vector3 } from 'three'
import { useControls } from './useControls'

const Vehicle = () => {
  const bodyRef = useRef()
  const frontWheelRef = useRef()
  const backLeftWheelRef = useRef()
  const backRightWheelRef = useRef()

  const [gameOver, setGameOver] = useState(false)
  const { forward, backward, left, right } = useControls()

  useFrame(() => {
    if (!bodyRef.current || gameOver) return
    const impulse = new Vector3()

    if (forward) impulse.z -= 0.1
    if (backward) impulse.z += 0.1
    if (left) impulse.x -= 0.1
    if (right) impulse.x += 0.1

    bodyRef.current.applyImpulse(impulse, true)
  })

  const handleCollision = (event) => {
    console.log('Collision detected:', event)
    setGameOver(true)
    // Optionally: Trigger any additional game-over logic (e.g., show a message, stop updates)
  }

  return (
    <>
      {gameOver && (
        <mesh position={[0, 5, 0]}>
          <textGeometry args={['Game Over', { font: 'helvetiker', size: 1, height: 0.1 }]} />
          <meshStandardMaterial color="red" />
        </mesh>
      )}

      {/* Body */}
      <RigidBody ref={bodyRef} type="dynamic" colliders="cuboid" onCollisionEnter={handleCollision}>
        <mesh castShadow>
          <boxGeometry args={[2, 0.5, 4]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </RigidBody>

      {/* Front Wheel */}
      <RigidBody ref={frontWheelRef} type="dynamic" colliders="ball">
        <mesh castShadow position={[0, 0.2, 1.5]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </RigidBody>

      {/* Back Left Wheel */}
      <RigidBody ref={backLeftWheelRef} type="dynamic" colliders="cylinder">
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]} position={[-0.6, 0.2, -1.5]}>
          <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </RigidBody>

      {/* Back Right Wheel */}
      <RigidBody ref={backRightWheelRef} type="dynamic" colliders="cylinder">
        <mesh castShadow rotation={[Math.PI / 2, 0, 0]} position={[0.6, 0.2, -1.5]}>
          <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </RigidBody>
    </>
  )
}

export default Vehicle
