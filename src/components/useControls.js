// src/components/useControls.js
import { useEffect, useState } from 'react'

export const useControls = () => {
  const [controls, setControls] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  const handleKeyDown = (e) => {
    switch (e.code) {
      case 'KeyW':
        setControls((controls) => ({ ...controls, forward: true }))
        break
      case 'KeyS':
        setControls((controls) => ({ ...controls, backward: true }))
        break
      case 'KeyA':
        setControls((controls) => ({ ...controls, left: true }))
        break
      case 'KeyD':
        setControls((controls) => ({ ...controls, right: true }))
        break
      default:
        break
    }
  }

  const handleKeyUp = (e) => {
    switch (e.code) {
      case 'KeyW':
        setControls((controls) => ({ ...controls, forward: false }))
        break
      case 'KeyS':
        setControls((controls) => ({ ...controls, backward: false }))
        break
      case 'KeyA':
        setControls((controls) => ({ ...controls, left: false }))
        break
      case 'KeyD':
        setControls((controls) => ({ ...controls, right: false }))
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return controls
}
