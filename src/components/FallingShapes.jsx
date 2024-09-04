// src/components/FallingShapes.jsx
import React, { useRef, useEffect } from 'react'
import { RigidBody } from '@react-three/rapier'
import { Vector3 } from 'three'
import { useRandomShape } from './useRandomShape'

const FallingShapes = () => {
  const shapeRefs = useRef([])
  const [randomShape, randomPosition] = useRandomShape()

  useEffect(() => {
    if (shapeRefs.current.length) {
      shapeRefs.current.forEach((shape, index) => {
        shape.position.set(randomPosition[index].x, randomPosition[index].y, randomPosition[index].z)
        shape.velocity.set(0, -5, 0) // Fall speed
      })
    }
  }, [randomShape])

  return (
    <>
      {randomShape.map((shape, index) => (
        <RigidBody key={index} type="dynamic" ref={(el) => (shapeRefs.current[index] = el)} colliders={shape.type}>
          <mesh>
            {shape.geometry}
            <meshStandardMaterial color={shape.color} />
          </mesh>
        </RigidBody>
      ))}
    </>
  )
}

export default FallingShapes
