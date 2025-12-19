import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

// 车身组件
function CarBody() {
  return (
    <group>
      {/* 主车身 */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 0.6, 4]} />
        <meshStandardMaterial color="#e74c3c" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* 车顶 */}
      <mesh position={[0, 1.2, -0.3]}>
        <boxGeometry args={[1.6, 0.8, 2]} />
        <meshStandardMaterial color="#c0392b" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* 前挡风玻璃 */}
      <mesh position={[0, 1.2, 0.7]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[1.58, 0.7, 0.1]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.4} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
      
      {/* 后挡风玻璃 */}
      <mesh position={[0, 1.2, -1.3]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[1.58, 0.7, 0.1]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.4} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
      
      {/* 侧窗 - 左侧 */}
      <mesh position={[0.8, 1.2, -0.3]}>
        <boxGeometry args={[0.05, 0.6, 1.8]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.4} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
      
      {/* 侧窗 - 右侧 */}
      <mesh position={[-0.8, 1.2, -0.3]}>
        <boxGeometry args={[0.05, 0.6, 1.8]} />
        <meshStandardMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.4} 
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>
      
      {/* 前灯 - 左 */}
      <mesh position={[0.6, 0.5, 2.05]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial 
          color="#ffeb3b" 
          emissive="#ffeb3b" 
          emissiveIntensity={0.8} 
        />
      </mesh>
      
      {/* 前灯 - 右 */}
      <mesh position={[-0.6, 0.5, 2.05]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial 
          color="#ffeb3b" 
          emissive="#ffeb3b" 
          emissiveIntensity={0.8} 
        />
      </mesh>
      
      {/* 尾灯 - 左 */}
      <mesh position={[0.6, 0.5, -2.05]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000" 
          emissiveIntensity={0.5} 
        />
      </mesh>
      
      {/* 尾灯 - 右 */}
      <mesh position={[-0.6, 0.5, -2.05]}>
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000" 
          emissiveIntensity={0.5} 
        />
      </mesh>
      
      {/* 前保险杠 */}
      <mesh position={[0, 0.25, 2.2]}>
        <boxGeometry args={[2, 0.2, 0.3]} />
        <meshStandardMaterial color="#34495e" metalness={0.8} roughness={0.3} />
      </mesh>
      
      {/* 后保险杠 */}
      <mesh position={[0, 0.25, -2.2]}>
        <boxGeometry args={[2, 0.2, 0.3]} />
        <meshStandardMaterial color="#34495e" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  )
}

// 车轮组件
function Wheel({ position }) {
  return (
    <group position={position}>
      {/* 轮胎 */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.3} roughness={0.7} />
      </mesh>
      
      {/* 轮毂 */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.32, 32]} />
        <meshStandardMaterial color="#95a5a6" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* 轮毂中心 */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.34, 32]} />
        <meshStandardMaterial color="#ecf0f1" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  )
}

// 完整的车模型
function Car() {
  const carRef = useRef()
  
  // 添加轻微的悬浮动画
  useFrame((state) => {
    if (carRef.current) {
      carRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      carRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })
  
  return (
    <group ref={carRef} position={[0, 0, 0]}>
      <CarBody />
      
      {/* 四个车轮 */}
      <Wheel position={[1, 0.4, 1.3]} />
      <Wheel position={[-1, 0.4, 1.3]} />
      <Wheel position={[1, 0.4, -1.3]} />
      <Wheel position={[-1, 0.4, -1.3]} />
    </group>
  )
}

// 主场景组件
export default function Car3D() {
  return (
    <div style={{ width: '600px', height: '600px', background: '#0f0f23' }}>
      <Canvas
        shadows
        camera={{ position: [8, 5, 8], fov: 50 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {/* 灯光设置 */}
          <ambientLight intensity={0.8} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1.5} 
            castShadow 
          />
          <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ffffff" />
          <hemisphereLight 
            color="#ffffff" 
            groundColor="#444444" 
            intensity={0.6} 
          />
          
          {/* 车模型 */}
          <Car />
          
          {/* 地面 */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial 
              color="#1a1a3e" 
              metalness={0.2} 
              roughness={0.8} 
            />
          </mesh>
          
          {/* 网格辅助线 - 可选，帮助调试 */}
          <gridHelper args={[30, 30, '#444444', '#222222']} position={[0, -0.49, 0]} />
          
          {/* 天空背景色 */}
          <color attach="background" args={['#0f0f23']} />
          
          {/* 轨道控制器 */}
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
      
      {/* UI 信息 */}
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
    </div>
  )
}