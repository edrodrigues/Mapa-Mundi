"Mapa Mundi"

import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null!)
  const texture = useLoader(THREE.TextureLoader, 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mapa_do_Mundo%20(1)-sKrpIW8GnWu7gd0IukuH8Sw0LlzFDV.png')
  const [isRotating, setIsRotating] = useState(true)

  useFrame(({ clock }) => {
    if (isRotating) {
      const elapsedTime = clock.getElapsedTime()
      earthRef.current.rotation.y = elapsedTime * (Math.PI / 10) // Full rotation in 20 seconds
    }
  })

  const handleClick = () => {
    setIsRotating(!isRotating)
  }

  return (
    <mesh ref={earthRef} onClick={handleClick}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

export default function Component() {
  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Earth />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
