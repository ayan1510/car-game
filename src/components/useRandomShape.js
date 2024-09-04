// src/components/useRandomShape.js
import { useState, useEffect } from 'react'
import * as THREE from 'three'

export const useRandomShape = () => {
  const [shapes, setShapes] = useState([])
  const [positions, setPositions] = useState([])

  useEffect(() => {
    const shapeCount = 10
    const newShapes = []
    const newPositions = []

    for (let i = 0; i < shapeCount; i++) {
      const shapeType = ['cube', 'sphere', 'pyramid'][Math.floor(Math.random() * 3)]
      const geometry = shapeType === 'cube'
        ? <boxGeometry args={[Math.random() + 0.5, Math.random() + 0.5, Math.random() + 0.5]} />
        : shapeType === 'sphere'
        ? <sphereGeometry args={[Math.random() + 0.5, 32, 32]} />
        : <coneGeometry args={[Math.random() + 0.5, Math.random() + 0.5, 4]} />

      newShapes.push({
        type: shapeType,
        geometry,
        color: new THREE.Color(Math.random(), Math.random(), Math.random())
      })

      newPositions.push({
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 + 5,
        z: Math.random() * 10 - 5,
      })
    }

    setShapes(newShapes)
    setPositions(newPositions)
  }, [])

  return [shapes, positions]
}
