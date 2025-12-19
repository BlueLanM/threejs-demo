import { useRef, Suspense, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

// 车门组件 - 左前门（从最前面旋转）
function LeftFrontDoor({ isOpen }) {
  const doorRef = useRef()
  
  useFrame(() => {
    if (doorRef.current) {
      const targetRotation = isOpen ? -Math.PI / 2.5 : 0
      doorRef.current.rotation.y += (targetRotation - doorRef.current.rotation.y) * 0.1
    }
  })
  
  return (
    <group position={[1, 1, 0.6]}>
      <group ref={doorRef}>
        {/* 车门本体 - 从前端边缘旋转 */}
        <mesh position={[-0.05, 0, -0.6]}>
          <boxGeometry args={[0.08, 0.8, 1.2]} />
          <meshStandardMaterial 
            color="#e74c3c" 
            metalness={0.85} 
            roughness={0.2} 
            envMapIntensity={1.5}
          />
        </mesh>
        {/* 车窗玻璃 */}
        <mesh position={[-0.05, 0.2, -0.6]}>
          <boxGeometry args={[0.09, 0.4, 1]} />
          <meshStandardMaterial 
            color="#87ceeb" 
            transparent 
            opacity={0.3} 
            metalness={1} 
            roughness={0.05} 
            envMapIntensity={2}
          />
        </mesh>
        {/* 门把手 */}
        <mesh position={[-0.1, 0, -0.3]}>
          <boxGeometry args={[0.02, 0.05, 0.15]} />
          <meshStandardMaterial 
            color="#2c3e50" 
            metalness={0.95} 
            roughness={0.1} 
          />
        </mesh>
      </group>
    </group>
  )
}

// 车门组件 - 右前门（从最前面旋转）
function RightFrontDoor({ isOpen }) {
  const doorRef = useRef()
  
  useFrame(() => {
    if (doorRef.current) {
      const targetRotation = isOpen ? Math.PI / 2.5 : 0
      doorRef.current.rotation.y += (targetRotation - doorRef.current.rotation.y) * 0.1
    }
  })
  
  return (
    <group position={[-1, 1, 0.6]}>
      <group ref={doorRef}>
        {/* 车门本体 - 从前端边缘旋转 */}
        <mesh position={[0.05, 0, -0.6]}>
          <boxGeometry args={[0.08, 0.8, 1.2]} />
          <meshStandardMaterial 
            color="#e74c3c" 
            metalness={0.85} 
            roughness={0.2} 
            envMapIntensity={1.5}
          />
        </mesh>
        {/* 车窗玻璃 */}
        <mesh position={[0.05, 0.2, -0.6]}>
          <boxGeometry args={[0.09, 0.4, 1]} />
          <meshStandardMaterial 
            color="#87ceeb" 
            transparent 
            opacity={0.3} 
            metalness={1} 
            roughness={0.05} 
            envMapIntensity={2}
          />
        </mesh>
        {/* 门把手 */}
        <mesh position={[0.1, 0, -0.3]}>
          <boxGeometry args={[0.02, 0.05, 0.15]} />
          <meshStandardMaterial 
            color="#2c3e50" 
            metalness={0.95} 
            roughness={0.1} 
          />
        </mesh>
      </group>
    </group>
  )
}

// 引擎盖组件（修复穿模问题 - 向上打开）
function Hood({ isOpen }) {
  const hoodRef = useRef()
  
  useFrame(() => {
    if (hoodRef.current) {
      const targetRotation = isOpen ? -Math.PI / 2.5 : 0
      hoodRef.current.rotation.x += (targetRotation - hoodRef.current.rotation.x) * 0.1
    }
  })
  
  return (
    <group position={[0, 0.85, 1]}>
      <group ref={hoodRef}>
        {/* 引擎盖 - 从前端边缘向上旋转 */}
        <mesh position={[0, 0, 0.5]}>
          <boxGeometry args={[1.95, 0.06, 1]} />
          <meshStandardMaterial 
            color="#e74c3c" 
            metalness={0.85} 
            roughness={0.2} 
            envMapIntensity={1.5}
          />
        </mesh>
        {/* 引擎盖装饰线 */}
        <mesh position={[0, 0.031, 0.5]}>
          <boxGeometry args={[1.9, 0.01, 0.05]} />
          <meshStandardMaterial 
            color="#c0392b" 
            metalness={0.9} 
            roughness={0.15} 
          />
        </mesh>
      </group>
    </group>
  )
}

// 后备箱组件（修复穿模问题 - 向上打开）
function Trunk({ isOpen }) {
  const trunkRef = useRef()
  
  useFrame(() => {
    if (trunkRef.current) {
      const targetRotation = isOpen ? Math.PI / 2.5 : 0
      trunkRef.current.rotation.x += (targetRotation - trunkRef.current.rotation.x) * 0.1
    }
  })
  
  return (
    <group position={[0, 0.85, -1.3]}>
      <group ref={trunkRef}>
        {/* 后备箱盖 - 从后端边缘向上旋转 */}
        <mesh position={[0, 0, -0.5]}>
          <boxGeometry args={[1.95, 0.5, 1]} />
          <meshStandardMaterial 
            color="#e74c3c" 
            metalness={0.85} 
            roughness={0.2} 
            envMapIntensity={1.5}
          />
        </mesh>
        {/* 后备箱玻璃 */}
        <mesh position={[0, 0.25, -0.5]}>
          <boxGeometry args={[1.9, 0.45, 0.05]} />
          <meshStandardMaterial 
            color="#87ceeb" 
            transparent 
            opacity={0.3} 
            metalness={1} 
            roughness={0.05} 
            envMapIntensity={2}
          />
        </mesh>
      </group>
    </group>
  )
}

// 车身组件（增强材质和细节）
function CarBody({ lightsOn, hazardLights }) {
  const [blinkState, setBlinkState] = useState(true)
  
  useFrame((state) => {
    if (hazardLights) {
      const time = state.clock.elapsedTime
      setBlinkState(Math.floor(time * 2) % 2 === 0)
    }
  })
  
  const getFrontLightIntensity = () => {
    if (hazardLights) {
      return blinkState ? 3 : 0.1
    }
    return lightsOn ? 3 : 0.2
  }
  
  const getRearLightIntensity = () => {
    if (hazardLights) {
      return blinkState ? 3 : 0.1
    }
    return lightsOn ? 2 : 0.2
  }

  return (
    <group>
      {/* 主车身 - 增强反光效果 */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.6, 4]} />
        <meshStandardMaterial 
          color="#e74c3c" 
          metalness={0.85} 
          roughness={0.2} 
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* 车身装饰线条 */}
      <mesh position={[1.01, 0.5, 0]}>
        <boxGeometry args={[0.01, 0.05, 3.8]} />
        <meshStandardMaterial color="#c0392b" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[-1.01, 0.5, 0]}>
        <boxGeometry args={[0.01, 0.05, 3.8]} />
        <meshStandardMaterial color="#c0392b" metalness={0.9} roughness={0.15} />
      </mesh>
      
      {/* 车顶 - 增强反光 */}
      <mesh position={[0, 1.2, -0.3]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.8, 2]} />
        <meshStandardMaterial 
          color="#c0392b" 
          metalness={0.85} 
          roughness={0.2} 
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* 车顶边缘装饰 */}
      <mesh position={[0, 1.6, -0.3]}>
        <boxGeometry args={[1.65, 0.02, 2.05]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.95} roughness={0.1} />
      </mesh>
      
      {/* 前挡风玻璃 - 更真实的玻璃效果 */}
      <mesh position={[0, 1.2, 0.7]} rotation={[0.3, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.58, 0.7, 0.08]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.3} 
          metalness={1} 
          roughness={0.05} 
          envMapIntensity={2}
        />
      </mesh>
      
      {/* 前挡风玻璃框架 */}
      <mesh position={[0, 1.2, 0.65]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[1.62, 0.74, 0.02]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* 后挡风玻璃 - 更真实的玻璃效果 */}
      <mesh position={[0, 1.2, -1.3]} rotation={[-0.2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.58, 0.7, 0.08]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.3} 
          metalness={1} 
          roughness={0.05} 
          envMapIntensity={2}
        />
      </mesh>
      
      {/* 后挡风玻璃框架 */}
      <mesh position={[0, 1.2, -1.35]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[1.62, 0.74, 0.02]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* 前灯 - 左 */}
      <mesh position={[0.6, 0.5, 2.05]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial 
          color="#ffeb3b" 
          emissive="#ffeb3b" 
          emissiveIntensity={getFrontLightIntensity()} 
        />
      </mesh>
      {(lightsOn || (hazardLights && blinkState)) && (
        <pointLight position={[0.6, 0.5, 2.3]} intensity={2} distance={10} color="#ffeb3b" />
      )}
      
      {/* 前灯 - 右 */}
      <mesh position={[-0.6, 0.5, 2.05]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial 
          color="#ffeb3b" 
          emissive="#ffeb3b" 
          emissiveIntensity={getFrontLightIntensity()} 
        />
      </mesh>
      {(lightsOn || (hazardLights && blinkState)) && (
        <pointLight position={[-0.6, 0.5, 2.3]} intensity={2} distance={10} color="#ffeb3b" />
      )}
      
      {/* 尾灯 - 左 */}
      <mesh position={[0.6, 0.5, -2.05]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000" 
          emissiveIntensity={getRearLightIntensity()} 
        />
      </mesh>
      {(lightsOn || (hazardLights && blinkState)) && (
        <pointLight position={[0.6, 0.5, -2.3]} intensity={1.5} distance={5} color="#ff0000" />
      )}
      
      {/* 尾灯 - 右 */}
      <mesh position={[-0.6, 0.5, -2.05]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000" 
          emissiveIntensity={getRearLightIntensity()} 
        />
      </mesh>
      {(lightsOn || (hazardLights && blinkState)) && (
        <pointLight position={[-0.6, 0.5, -2.3]} intensity={1.5} distance={5} color="#ff0000" />
      )}
      
      {/* 前保险杠 - 增强反光 */}
      <mesh position={[0, 0.25, 2.2]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.2, 0.3]} />
        <meshStandardMaterial 
          color="#34495e" 
          metalness={0.95} 
          roughness={0.15} 
          envMapIntensity={1.2}
        />
      </mesh>
      
      {/* 前保险杠装饰 */}
      <mesh position={[0, 0.25, 2.36]}>
        <boxGeometry args={[1.8, 0.15, 0.02]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.98} roughness={0.1} />
      </mesh>
      
      {/* 后保险杠 - 增强反光 */}
      <mesh position={[0, 0.25, -2.2]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.2, 0.3]} />
        <meshStandardMaterial 
          color="#34495e" 
          metalness={0.95} 
          roughness={0.15} 
          envMapIntensity={1.2}
        />
      </mesh>
      
      {/* 后保险杠装饰 */}
      <mesh position={[0, 0.25, -2.36]}>
        <boxGeometry args={[1.8, 0.15, 0.02]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.98} roughness={0.1} />
      </mesh>
      
      {/* 车底盘 */}
      <mesh position={[0, 0.18, 0]} receiveShadow>
        <boxGeometry args={[1.8, 0.05, 3.8]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.6} roughness={0.5} />
      </mesh>
      
      {/* 后视镜 - 左 */}
      <group position={[1, 1.1, 0.7]}>
        <mesh position={[0.1, 0, 0]}>
          <boxGeometry args={[0.05, 0.08, 0.12]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.15, 0, 0]}>
          <boxGeometry args={[0.02, 0.12, 0.16]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.98} roughness={0.05} />
        </mesh>
      </group>
      
      {/* 后视镜 - 右 */}
      <group position={[-1, 1.1, 0.7]}>
        <mesh position={[-0.1, 0, 0]}>
          <boxGeometry args={[0.05, 0.08, 0.12]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[-0.15, 0, 0]}>
          <boxGeometry args={[0.02, 0.12, 0.16]} />
          <meshStandardMaterial color="#2c3e50" metalness={0.98} roughness={0.05} />
        </mesh>
      </group>
    </group>
  )
}

// 车轮组件（增强细节和反光）
function Wheel({ position, spinning, reverse }) {
  const wheelRef = useRef()
  
  useFrame(() => {
    if (wheelRef.current && spinning) {
      wheelRef.current.rotation.x += reverse ? -0.15 : 0.15
    }
  })
  
  return (
    <group position={position} ref={wheelRef}>
      {/* 轮胎 */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial 
          color="#3a3a3a" 
          metalness={0.3} 
          roughness={0.6} 
        />
      </mesh>
      
      {/* 轮胎纹路 */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.41, 0.41, 0.28, 32]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.2} 
          roughness={0.7} 
        />
      </mesh>
      
      {/* 轮胎纹路线条 - 径向线条用于展示旋转效果 */}
      {[...Array(16)].map((_, i) => (
        <mesh 
          key={`tread-${i}`}
          rotation={[0, (Math.PI * 2 * i) / 16, Math.PI / 2]} 
          position={[0, 0, 0]}
        >
          <boxGeometry args={[0.025, 0.415, 0.29]} />
          <meshStandardMaterial 
            color="#505050" 
            metalness={0.25} 
            roughness={0.75} 
          />
        </mesh>
      ))}
      
      {/* 轮毂 - 更真实的金属效果 */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.32, 32]} />
        <meshStandardMaterial 
          color="#95a5a6" 
          metalness={0.95} 
          roughness={0.15} 
          envMapIntensity={1.5}
        />
      </mesh>
      
      {/* 轮毂辐条 */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh 
          key={i} 
          rotation={[0, (Math.PI * 2 * i) / 5, Math.PI / 2]} 
          position={[0, 0, 0]}
        >
          <boxGeometry args={[0.05, 0.25, 0.33]} />
          <meshStandardMaterial 
            color="#bdc3c7" 
            metalness={0.98} 
            roughness={0.1} 
          />
        </mesh>
      ))}
      
      {/* 轮毂中心 - 高反光 */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.34, 32]} />
        <meshStandardMaterial 
          color="#ecf0f1" 
          metalness={1} 
          roughness={0.05} 
          envMapIntensity={2}
        />
      </mesh>
      
      {/* 刹车盘 */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.02, 32]} />
        <meshStandardMaterial 
          color="#7f8c8d" 
          metalness={0.9} 
          roughness={0.3} 
        />
      </mesh>
    </group>
  )
}

// 完整的车模型
function Car({ 
  isEngineOn, 
  lightsOn, 
  hazardLights, 
  doorsOpen, 
  hoodOpen, 
  trunkOpen,
  isMovingForward,
  isMovingBackward
}) {
  const carRef = useRef()
  const positionRef = useRef({ x: 0, z: 0 })
  
  useFrame((state) => {
    if (carRef.current) {
      if (isEngineOn) {
        // 引擎振动效果 - 适度振动
        const vibrationX = Math.sin(state.clock.elapsedTime * 18) * 0.008
        const vibrationY = Math.sin(state.clock.elapsedTime * 12) * 0.015
        const vibrationZ = Math.cos(state.clock.elapsedTime * 15) * 0.008
        
        carRef.current.position.x = positionRef.current.x + vibrationX
        carRef.current.position.y = vibrationY
        carRef.current.position.z = positionRef.current.z + vibrationZ
        
        // 轻微的旋转振动
        carRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 10) * 0.005
        carRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 12) * 0.005
      } else {
        // 平滑停止
        carRef.current.position.y += (0 - carRef.current.position.y) * 0.05
        carRef.current.rotation.x += (0 - carRef.current.rotation.x) * 0.1
        carRef.current.rotation.z += (0 - carRef.current.rotation.z) * 0.1
      }
      
      // 前进后退移动
      if (isMovingForward && isEngineOn) {
        positionRef.current.z += 0.05
      } else if (isMovingBackward && isEngineOn) {
        positionRef.current.z -= 0.05
      }
    }
  })
  
  return (
    <group ref={carRef} position={[0, 0, 0]}>
      <CarBody lightsOn={lightsOn} hazardLights={hazardLights} />
      
      <LeftFrontDoor isOpen={doorsOpen} />
      <RightFrontDoor isOpen={doorsOpen} />
      <Hood isOpen={hoodOpen} />
      <Trunk isOpen={trunkOpen} />
      
      <Wheel position={[1, 0.4, 1.3]} spinning={isMovingForward || isMovingBackward} reverse={isMovingBackward} />
      <Wheel position={[-1, 0.4, 1.3]} spinning={isMovingForward || isMovingBackward} reverse={isMovingBackward} />
      <Wheel position={[1, 0.4, -1.3]} spinning={isMovingForward || isMovingBackward} reverse={isMovingBackward} />
      <Wheel position={[-1, 0.4, -1.3]} spinning={isMovingForward || isMovingBackward} reverse={isMovingBackward} />
    </group>
  )
}

// 主场景组件
export default function Car3D() {
  const [isEngineOn, setIsEngineOn] = useState(false)
  const [lightsOn, setLightsOn] = useState(false)
  const [hazardLights, setHazardLights] = useState(false)
  const [doorsOpen, setDoorsOpen] = useState(false)
  const [hoodOpen, setHoodOpen] = useState(false)
  const [trunkOpen, setTrunkOpen] = useState(false)
  const [isMovingForward, setIsMovingForward] = useState(false)
  const [isMovingBackward, setIsMovingBackward] = useState(false)
  
  const handleEngineToggle = () => {
    setIsEngineOn(!isEngineOn)
    if (!isEngineOn) {
      setDoorsOpen(false)
      setHoodOpen(false)
      setTrunkOpen(false)
    }
  }
  
  return (
    <div style={{ width: '1000px', height: '700px', background: '#0f0f23', position: 'relative' }}>
      <Canvas
        shadows
        camera={{ position: [8, 5, 8], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          {/* 优化的光照系统 - 增强亮度 */}
          <ambientLight intensity={1.2} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={2.5} 
            castShadow 
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <directionalLight 
            position={[-10, 10, -5]} 
            intensity={1.5} 
          />
          <pointLight position={[-10, 8, -10]} intensity={1.2} color="#ffffff" />
          <pointLight position={[10, 8, 10]} intensity={1.2} color="#ffffff" />
          <pointLight position={[0, 10, 0]} intensity={0.8} color="#ffffff" />
          <hemisphereLight color="#ffffff" groundColor="#888888" intensity={1.0} />
          <spotLight 
            position={[0, 15, 0]} 
            angle={0.4} 
            penumbra={1} 
            intensity={1.2} 
            castShadow 
          />
          
          <Car 
            isEngineOn={isEngineOn}
            lightsOn={lightsOn}
            hazardLights={hazardLights}
            doorsOpen={doorsOpen}
            hoodOpen={hoodOpen}
            trunkOpen={trunkOpen}
            isMovingForward={isMovingForward}
            isMovingBackward={isMovingBackward}
          />
          
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial 
              color="#1a1a3e" 
              metalness={0.3} 
              roughness={0.7} 
              envMapIntensity={0.5}
            />
          </mesh>
          
          <gridHelper args={[50, 50, '#444444', '#1a1a2e']} position={[0, -0.49, 0]} />
          <color attach="background" args={['#0f0f23']} />
          
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={25}
            maxPolarAngle={Math.PI / 2.2}
            target={[0, 0.5, 0]}
          />
        </Suspense>
      </Canvas>
      
      {/* 左侧 UI 信息 */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        background: 'rgba(0,0,0,0.7)',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h2 style={{ margin: '0 0 10px 0' }}>🚗 3D 车模型</h2>
        <p style={{ margin: '5px 0' }}>• 拖拽鼠标旋转视角</p>
        <p style={{ margin: '5px 0' }}>• 滚轮缩放视图</p>
        <p style={{ margin: '5px 0' }}>• 右键拖拽平移</p>
      </div>
      
      {/* 右侧控制面板 */}
      <div style={{
        position: 'absolute',
        top: 20,
        right: 20,
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        background: 'rgba(0,0,0,0.8)',
        padding: '20px',
        borderRadius: '12px',
        fontSize: '14px',
        minWidth: '200px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', textAlign: 'center' }}>🎮 车辆控制</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={handleEngineToggle}
            style={{
              padding: '12px',
              background: isEngineOn 
                ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            {isEngineOn ? '🔴 关闭引擎' : '🟢 启动引擎'}
          </button>
          
          <button
            onClick={() => {
              setLightsOn(!lightsOn)
              if (!lightsOn) setHazardLights(false)
            }}
            disabled={!isEngineOn}
            style={{
              padding: '10px',
              background: lightsOn 
                ? 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)'
                : 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              cursor: isEngineOn ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              opacity: isEngineOn ? 1 : 0.5,
              transition: 'all 0.3s ease'
            }}
          >
            {lightsOn ? '💡 关闭车灯' : '🔦 开启车灯'}
          </button>
          
          <button
            onClick={() => {
              setHazardLights(!hazardLights)
              if (!hazardLights) setLightsOn(false)
            }}
            disabled={!isEngineOn}
            style={{
              padding: '10px',
              background: hazardLights 
                ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)'
                : 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              cursor: isEngineOn ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              opacity: isEngineOn ? 1 : 0.5,
              transition: 'all 0.3s ease'
            }}
          >
            {hazardLights ? '⚠️ 关闭双闪' : '⚡ 开启双闪'}
          </button>
          
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', margin: '5px 0' }} />
          
          <button
            onClick={() => setDoorsOpen(!doorsOpen)}
            disabled={isEngineOn}
            style={{
              padding: '10px',
              background: doorsOpen 
                ? 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
                : 'rgba(255,255,255,0.1)',
              color: doorsOpen ? '#333' : 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              cursor: isEngineOn ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              opacity: isEngineOn ? 0.5 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            {doorsOpen ? '🚪 关闭车门' : '🔓 打开车门'}
          </button>
          
          <button
            onClick={() => setHoodOpen(!hoodOpen)}
            disabled={isEngineOn}
            style={{
              padding: '10px',
              background: hoodOpen 
                ? 'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)'
                : 'rgba(255,255,255,0.1)',
              color: hoodOpen ? '#333' : 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              cursor: isEngineOn ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              opacity: isEngineOn ? 0.5 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            {hoodOpen ? '🔧 关闭引擎盖' : '🔩 打开引擎盖'}
          </button>
          
          <button
            onClick={() => setTrunkOpen(!trunkOpen)}
            disabled={isEngineOn}
            style={{
              padding: '10px',
              background: trunkOpen 
                ? 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
                : 'rgba(255,255,255,0.1)',
              color: trunkOpen ? '#333' : 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              cursor: isEngineOn ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              opacity: isEngineOn ? 0.5 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            {trunkOpen ? '🛄 关闭后备箱' : '📦 打开后备箱'}
          </button>
          
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', margin: '5px 0' }} />
          
          {/* 前进按钮 */}
          <button
            onMouseDown={() => setIsMovingForward(true)}
            onMouseUp={() => setIsMovingForward(false)}
            onMouseLeave={() => setIsMovingForward(false)}
            onTouchStart={() => setIsMovingForward(true)}
            onTouchEnd={() => setIsMovingForward(false)}
            disabled={!isEngineOn}
            style={{
              padding: '12px',
              background: isMovingForward 
                ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
                : 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              cursor: isEngineOn ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: 'bold',
              opacity: isEngineOn ? 1 : 0.5,
              transition: 'all 0.3s ease'
            }}
          >
            {isMovingForward ? '🚗💨 前进中...' : '⬆️ 前进（按住）'}
          </button>
          
          {/* 后退按钮 */}
          <button
            onMouseDown={() => setIsMovingBackward(true)}
            onMouseUp={() => setIsMovingBackward(false)}
            onMouseLeave={() => setIsMovingBackward(false)}
            onTouchStart={() => setIsMovingBackward(true)}
            onTouchEnd={() => setIsMovingBackward(false)}
            disabled={!isEngineOn}
            style={{
              padding: '12px',
              background: isMovingBackward 
                ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
                : 'rgba(255,255,255,0.1)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              cursor: isEngineOn ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: 'bold',
              opacity: isEngineOn ? 1 : 0.5,
              transition: 'all 0.3s ease'
            }}
          >
            {isMovingBackward ? '🔙💨 后退中...' : '⬇️ 后退（按住）'}
          </button>
        </div>
        
        <div style={{
          marginTop: '15px',
          padding: '10px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '6px',
          fontSize: '12px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <p style={{ margin: '0' }}>
            {isEngineOn ? '✅ 引擎运行中' : '⏸️ 引擎已关闭'}
          </p>
          {isEngineOn && (
            <p style={{ margin: '5px 0 0 0', fontSize: '11px', opacity: 0.7 }}>
              启动时无法操作车门
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
