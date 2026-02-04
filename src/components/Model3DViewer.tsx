'use client'

import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

interface ModelProps {
  modelPath: string
  autoRotate?: boolean
  scrollProgress?: number
}

function Model({ modelPath, autoRotate = true, scrollProgress = 0 }: ModelProps): JSX.Element {
  const groupRef = useRef<THREE.Group>(null)
  const capRef = useRef<THREE.Object3D | null>(null)
  const initialCapY = useRef<number | null>(null)
  const gltf = useGLTF(modelPath)
  
  // Set initial rotation to face front
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = 0 // Face front directly
    }
  }, [])

  // Find the cap in the model (Auto-detect logic)
  useEffect(() => {
    if (gltf.scene) {
      let highestY = -Infinity
      let highestMesh: any = null
      
      console.log('--- Model Hierarchy Analysis ---')
      
      gltf.scene.traverse((child: any) => {
        // Log all names for debugging
        if (child.isMesh || child.isGroup) {
          console.log(`Node: ${child.name}, Type: ${child.type}, Y: ${child.position.y}`)
        }

        // 1. Try to find by name first
        const name = child.name?.toLowerCase() || ''
        if (name.includes('cap') || 
            name.includes('top') || 
            name.includes('lid') || 
            name.includes('cover') ||
            name.includes('head') ||
            name.includes('stopper')) {
          
          if (!name.includes('bottle') && !name.includes('glass')) {
            console.log('✅ Found Cap by Name:', child.name)
            capRef.current = child
          }
        }
        
        // 2. Track the highest mesh (Backup plan)
        // Only check meshes that are not part of the bottle body
        if (child.isMesh) {
             // Get world position to be accurate
             const worldPos = new THREE.Vector3()
             child.getWorldPosition(worldPos)
             
             if (worldPos.y > highestY) {
               highestY = worldPos.y
               highestMesh = child
             }
        }

        // Material setup (Liquid, Glass, etc)
        if (child.isMesh && child.material) {
          child.castShadow = true
          child.receiveShadow = true
          
          const material = child.material
          const materialName = material.name?.toLowerCase() || ''
          
          // Check if this is a liquid/content material
          const isLiquid = materialName.includes('liquid') || 
                          materialName.includes('fluid') || 
                          materialName.includes('content') ||
                          materialName.includes('perfume') ||
                          materialName.includes('juice')
          
          // Check if this is a glass material
          const isGlass = !isLiquid && (
                         material.transparent || 
                         material.transmission > 0 || 
                         material.opacity < 1 ||
                         materialName.includes('glass') ||
                         materialName.includes('bottle'))
          
          if (isLiquid) {
            // Liquid settings
            material.transparent = true
            material.opacity = 0.95
            material.roughness = 0.0
            material.metalness = 0.0
            material.envMapIntensity = 3.0
            material.transmission = 0.0
            material.color = new THREE.Color(0xD90000)
            material.emissive = new THREE.Color(0xFF0000)
            material.emissiveIntensity = 0.6
          } else if (isGlass) {
            // Glass settings
            material.transparent = true
            material.opacity = 0.3
            material.roughness = 0.0
            material.metalness = 0.0
            material.envMapIntensity = 3.0
            material.transmission = 1.0
            material.thickness = 0.5
            material.ior = 1.5
          } else {
            material.envMapIntensity = 1.5
            material.roughness = 0.2
            material.metalness = 0.5
          }
          material.needsUpdate = true
        }
      })
      
      // If no cap found by name, use the highest mesh
      if (!capRef.current && highestMesh) {
        console.log('⚠️ Cap not found by name. Using highest mesh:', highestMesh.name)
        capRef.current = highestMesh
      }
      
      // Initialize Position
      if (capRef.current) {
        // Store initial position if not stored
        if (initialCapY.current === null) {
          initialCapY.current = capRef.current.position.y
          console.log('📍 Cap Initial Y:', initialCapY.current)
        }
      } else {
        console.error('❌ FAILED TO FIND CAP OBJECT')
      }
    }
  }, [gltf.scene])
  
  // Cap animation based on scroll progress
  useFrame(() => {
    if (capRef.current && initialCapY.current !== null) {
      // Calculate step (0-5)
      const step = scrollProgress * 5
      let capOffset = 0
      
      // Step 2~3: Open (Fully)
      // Step 4+: Close
      
      if (step >= 2 && step < 4) {
        if (step < 2.5) {
            // Opening Phase (2.0 -> 2.5)
            const openProgress = (step - 2.0) / 0.5
            capOffset = openProgress * 10.0 // INCREASED OFFSET to 10.0
        } else if (step < 3.5) {
            // Hold Phase (2.5 -> 3.5) - FULLY OPEN
            capOffset = 10.0 // KEEP AT 10.0
        } else {
            // Closing Phase (3.5 -> 4.0)
            const closeProgress = (step - 3.5) / 0.5
            capOffset = (1 - closeProgress) * 10.0
        }
      } else {
        capOffset = 0
      }
      
      // Direct Position Update
      const targetY = initialCapY.current + capOffset
      capRef.current.position.y = THREE.MathUtils.lerp(capRef.current.position.y, targetY, 0.2) // Faster lerp
    }
  })
  
  // Gentle auto-rotate (only when enabled)
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.2 // Slower rotation
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} scale={2.2} position={[0, -0.5, 0]} />
    </group>
  )
}

// Shadow catcher plane - 병보다 조금 아래
function ShadowPlane(): JSX.Element {
  return (
    <mesh 
      receiveShadow 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -0.4, 0]}
    >
      <planeGeometry args={[60, 60]} />
      <shadowMaterial transparent opacity={0.14} />
    </mesh>
  )
}

// Key Light with target
function KeyLightWithTarget(): JSX.Element {
  const lightRef = useRef<THREE.DirectionalLight>(null)
  const targetRef = useRef<THREE.Object3D>(null)
  
  useEffect(() => {
    if (lightRef.current && targetRef.current) {
      lightRef.current.target = targetRef.current
    }
  }, [])
  
  return (
    <>
      <object3D ref={targetRef} position={[0, -0.28, 0]} />
      <directionalLight 
        ref={lightRef}
        position={[0.6, 5, 4]} 
        intensity={2.0} // Increased from 1.4
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-radius={14}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
      />
    </>
  )
}

// HDRI Environment loader
function HDRIEnvironment(): JSX.Element {
  const { scene } = useThree()
  
  useEffect(() => {
    const loader = new RGBELoader()
    loader.load(
      '/hdri/envmap-liquid.exr',
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping
        scene.environment = texture
      },
      undefined,
      (error) => {
        console.error('Error loading HDRI:', error)
      }
    )
  }, [scene])
  
  return null
}

// Camera Controller - animates camera based on scroll progress
interface CameraControllerProps {
  scrollProgress: number
}

function CameraController({ scrollProgress }: CameraControllerProps): JSX.Element {
  const { camera } = useThree()
  const smoothedProgress = useRef(scrollProgress)
  
  useFrame((state, delta) => {
    // 1. Smooth out the scroll progress input
    // Lerp current smoothed value towards target scrollProgress
    // Adjust 3.0 for speed/smoothness (lower = smoother/slower, higher = sharper/faster)
    smoothedProgress.current = THREE.MathUtils.lerp(smoothedProgress.current, scrollProgress, delta * 3.0)
    
    // Define 6 camera positions (0-5 steps)
    const stepFloat = smoothedProgress.current * 5
    const currentStepIndex = Math.floor(stepFloat)
    const nextStepIndex = Math.min(5, currentStepIndex + 1)
    const stepProgress = stepFloat - currentStepIndex // 0 to 1 within the step
    
    // Camera positions for each step
    const cameraPositions = [
      { pos: [0, 0.5, 6.0], target: [0, 0.5, 0] },     // Step 0 - Front (Centered correctly)
      { pos: [3.5, 1.5, 4], target: [0, 0.2, 0] },     // Step 1 - Diagonal Top-Right
      { pos: [5, 0.3, 0], target: [0, 0.2, 0] },       // Step 2 - Side
      { pos: [0, 4.5, 0.5], target: [0, 0.5, 0] },     // Step 3 - Top (Open)
      { pos: [0, 6, 1], target: [0, 0.3, 0] },         // Step 4 - Top (Closed, further away)
      { pos: [0, 0.5, 6.0], target: [0, 0.5, 0] },     // Step 5 - Front again (Centered correctly)
    ]
    
    // Ensure we don't go out of bounds
    const current = cameraPositions[Math.min(5, Math.max(0, currentStepIndex))]
    const next = cameraPositions[Math.min(5, Math.max(0, nextStepIndex))]
    
    // Use Smoothstep for interpolation between keyframes
    const smoothFactor = stepProgress * stepProgress * (3 - 2 * stepProgress)
    
    // Lerp position
    camera.position.x = THREE.MathUtils.lerp(current.pos[0], next.pos[0], smoothFactor)
    camera.position.y = THREE.MathUtils.lerp(current.pos[1], next.pos[1], smoothFactor)
    camera.position.z = THREE.MathUtils.lerp(current.pos[2], next.pos[2], smoothFactor)
    
    // Lerp lookAt target
    const targetX = THREE.MathUtils.lerp(current.target[0], next.target[0], smoothFactor)
    const targetY = THREE.MathUtils.lerp(current.target[1], next.target[1], smoothFactor)
    const targetZ = THREE.MathUtils.lerp(current.target[2], next.target[2], smoothFactor)
    
    camera.lookAt(targetX, targetY, targetZ)
    
    camera.updateProjectionMatrix()
  })
  
  return null
}

// Preload the GLB file
useGLTF.preload('/byredo.glb')

interface Model3DViewerProps {
  modelPath?: string
  currentImageIndex?: number
  scrollProgress?: number
}

function LoadingFallback(): JSX.Element {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  )
}

export default function Model3DViewer({ 
  modelPath = '/byredo.glb',
  currentImageIndex = 0,
  scrollProgress = 0
}: Model3DViewerProps): JSX.Element {
  const hasScrollAnimation = scrollProgress !== undefined
  
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5, // 더 밝게
          outputEncoding: 3001 // sRGBEncoding (Color Space: sRGB)
        }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.setClearColor('#ececec', 1)
          gl.physicallyCorrectLights = true
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0.2, 5.5]} fov={45} />
        
        {/* Camera Controller - only active when scrollProgress is provided */}
        {hasScrollAnimation && <CameraController scrollProgress={scrollProgress} />}
        
        {/* Ambient Light - Brighter base */}
        <ambientLight intensity={1.0} color="#ffffff" />
        
        {/* Key Light - Stronger main light */}
        <KeyLightWithTarget />
        
        {/* Fill Light - Brighter fill */}
        <directionalLight 
          position={[-2, 1, 1]} 
          intensity={1.2}
          color="#ffffff"
        />
        
        {/* Rim Light - Stronger edge definition */}
        <pointLight
          position={[0, 2, -3]}
          intensity={2.5}
          color="#ffffff"
        />
        
        {/* Back Light - Intense backlight for liquid transmission */}
        <pointLight 
          position={[0, 1.5, -4]} 
          intensity={2.0}
          color={0xffffff}
        />
        
        {/* Bottom light */}
        <pointLight 
          position={[0, -0.5, 0]} 
          intensity={1.0}
          color={0xffffff}
        />
        
        {/* HDRI Environment */}
        <HDRIEnvironment />
        
        {/* Shadow Plane */}
        <ShadowPlane />
        
        {/* 3D Model */}
        <Suspense fallback={<LoadingFallback />}>
          <Model 
            modelPath={modelPath} 
            autoRotate={!hasScrollAnimation} 
            scrollProgress={scrollProgress}
          />
        </Suspense>
        
        {/* Controls - disabled when scroll animation is active */}
        <OrbitControls 
          enabled={!hasScrollAnimation}
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={8}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  )
}
