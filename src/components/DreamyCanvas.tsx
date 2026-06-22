import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function DreamyCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Create a dreamy particle field
    const geometry = new THREE.BufferGeometry()
    const particlesCount = 2000
    const posArray = new Float32Array(particlesCount * 3)

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const material = new THREE.PointsMaterial({
        size: 0.02,
        color: '#c0c0b0',
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    })

    const particlesMesh = new THREE.Points(geometry, material)
    scene.add(particlesMesh)

    camera.position.z = 3

    let animationFrameId: number

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.001
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-[-1] pointer-events-none bg-[#141512]" 
      aria-hidden="true" 
    />
  )
}
