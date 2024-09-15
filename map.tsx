"use client"

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { PerspectiveCamera } from 'three';

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null!)
  const texture = useLoader(THREE.TextureLoader, 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mapa_do_Mundo%20(1)-sKrpIW8GnWu7gd0IukuH8Sw0LlzFDV.png')
  const [isRotating, setIsRotating] = useState(true)
  const { size } = useThree()

  useEffect(() => {
    const handleResize = () => {
      if (earthRef.current) {
        const scale = Math.min(size.width, size.height) / 500
        earthRef.current.scale.set(scale, scale, scale)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [size])

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

function CameraController() {
  const { camera, gl } = useThree()
  useEffect(() => {
    const handleResize = () => {
      camera.aspect = gl.domElement.clientWidth / gl.domElement.clientHeight
      camera.updateProjectionMatrix()
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [camera, gl])

  return null
}

export default function Component() {
  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 } as PerspectiveCamera}> 
        <CameraController />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Earth />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI - Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}
