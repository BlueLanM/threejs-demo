import React,{ useState, useEffect } from "react";
import { Canvas, useFrame  } from "@react-three/fiber";
import { useSpring, animated, config } from '@react-spring/three'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import "./App.css";

function MyRotatingBox() {
  const myMesh = React.useRef();
  const [hovered, setHovered] = useState(false);

  const { scale, color } = useSpring({
    scale: hovered ? 1.2 : 1,
    color: hovered ? '#4ecdc4' : '#4169e1',
    config: config.wobbly,
  });

  // 生成随机旋转速度,只在组件初始化时生成一次
  const rotationSpeed = React.useRef({
    x: (Math.random() - 0.5) * 5,
    y: (Math.random() - 0.5) * 5,
    z: (Math.random() - 0.5) * 5
  });

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    // 在三个轴上以不同的随机速度旋转
    myMesh.current.rotation.x = a * rotationSpeed.current.x;
    myMesh.current.rotation.y = a * rotationSpeed.current.y;
    myMesh.current.rotation.z = a * rotationSpeed.current.z;
    
    // 添加悬浮效果 - 上下浮动
    myMesh.current.position.y += Math.sin(a * 2) * 0.002;
  });

  return (
    <animated.mesh 
      scale={scale}
      ref={myMesh} 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry />
      <animated.meshStandardMaterial 
        color={color}
        metalness={0.3}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={hovered ? 1.5 : 0.8}
        toneMapped={false}
      />
    </animated.mesh>
  );
}

// 添加粒子背景
function Particles({ isMobile }) {
  const particlesRef = React.useRef();
  const particleCount = isMobile ? 50 : 100; // 移动端减少粒子数
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} 
        color="#ffffff" 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// 立方体内部的景观 - 星空能量核心
function InnerScape({ isMobile }) {
  const particlesRef = React.useRef();
  const coreRef = React.useRef();
  const shockwaveRef = React.useRef();
  const ring1Ref = React.useRef();
  const ring2Ref = React.useRef();
  const ring3Ref = React.useRef();
  const particleCount = isMobile ? 400 : 800; // 移动端减少粒子数
  
  // 创建内部星空粒子
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // 在一个小范围内随机分布
      const radius = Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  const colors = React.useMemo(() => {
    const col = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // 更丰富的颜色：紫色、蓝色、粉色、青色、金色
      const colorType = Math.random();
      if (colorType < 0.2) {
        col[i * 3] = 0.8; col[i * 3 + 1] = 0.2; col[i * 3 + 2] = 1.0; // 紫色
      } else if (colorType < 0.4) {
        col[i * 3] = 0.2; col[i * 3 + 1] = 0.6; col[i * 3 + 2] = 1.0; // 蓝色
      } else if (colorType < 0.6) {
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.4; col[i * 3 + 2] = 0.8; // 粉色
      } else if (colorType < 0.8) {
        col[i * 3] = 0.0; col[i * 3 + 1] = 1.0; col[i * 3 + 2] = 1.0; // 青色
      } else {
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.8; col[i * 3 + 2] = 0.2; // 金色
      }
    }
    return col;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    // 粒子旋转和动态效果
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.3;
      particlesRef.current.rotation.x = time * 0.15;
      
      // 粒子呼吸效果
      const breathe = 1 + Math.sin(time * 2) * 0.1;
      particlesRef.current.scale.set(breathe, breathe, breathe);
    }
    
    // 能量核心多彩炫酷效果
    if (coreRef.current) {
      // 快速剧烈脉动 + 随机震动
      const fastPulse = Math.sin(time * 8) * 0.15;
      const shake = Math.sin(time * 20) * 0.03;
      const scale = 1 + fastPulse + shake;
      coreRef.current.scale.set(scale, scale, scale);
      
      // 随机位置抖动
      coreRef.current.position.x = Math.sin(time * 15) * 0.02;
      coreRef.current.position.y = Math.cos(time * 17) * 0.02;
      coreRef.current.position.z = Math.sin(time * 13) * 0.02;
      
      // 颜色强度闪烁和颜色变化
      const intensity = 3 + Math.sin(time * 10) * 2;
      if (coreRef.current.material) {
        coreRef.current.material.emissiveIntensity = intensity;
        
        // 动态改变核心颜色
        const r = 0.5 + Math.sin(time * 3) * 0.5;
        const g = 0.3 + Math.sin(time * 5) * 0.3;
        const b = 0.8 + Math.sin(time * 7) * 0.2;
        coreRef.current.material.emissive.setRGB(r, g, b);
        coreRef.current.material.color.setRGB(r, g, b);
      }
    }
    
    // 多层能量波纹扩散效果
    if (shockwaveRef.current) {
      const cycle = (time * 2) % 2;
      const progress = cycle / 2;
      
      const scale = 0.5 + progress * 2;
      shockwaveRef.current.scale.set(scale, scale, scale);
      
      const opacity = 1 - progress;
      if (shockwaveRef.current.material) {
        shockwaveRef.current.material.opacity = opacity * 0.8;
      }
    }
    
    // 能量环1 - 快速旋转
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 2;
      ring1Ref.current.rotation.y = time * 1.5;
      const pulse = 1 + Math.sin(time * 4) * 0.1;
      ring1Ref.current.scale.set(pulse, pulse, pulse);
    }
    
    // 能量环2 - 反向旋转
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -time * 1.5;
      ring2Ref.current.rotation.z = time * 2;
      const pulse = 1 + Math.cos(time * 4) * 0.1;
      ring2Ref.current.scale.set(pulse, pulse, pulse);
    }
    
    // 能量环3 - 独特旋转
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * 1.8;
      ring3Ref.current.rotation.z = -time * 1.2;
      const pulse = 1 + Math.sin(time * 3) * 0.1;
      ring3Ref.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group>
      {/* 内部星空粒子 */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.025} 
          vertexColors
          transparent 
          opacity={0.9}
          sizeAttenuation
          blending={2}
        />
      </points>
      
      {/* 能量冲击波 */}
      <mesh ref={shockwaveRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial 
          color="#ff00aa"
          transparent
          opacity={0.8}
          wireframe={true}
        />
      </mesh>
      
      {/* 能量环1 - 紫色 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.4, 0.02, 16, 100]} />
        <meshStandardMaterial 
          color="#9d00ff"
          emissive="#9d00ff"
          emissiveIntensity={3}
          toneMapped={false}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* 能量环2 - 青色 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[0.5, 0.015, 16, 100]} />
        <meshStandardMaterial 
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={3}
          toneMapped={false}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* 能量环3 - 金色 */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[0.35, 0.025, 16, 100]} />
        <meshStandardMaterial 
          color="#ffd700"
          emissive="#ffd700"
          emissiveIntensity={3}
          toneMapped={false}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* 能量核心 - 多彩动态 */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial 
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={3}
          toneMapped={false}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* 核心内部发光球 */}
      <mesh scale={0.8}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial 
          color="#ffffff"
          transparent
          opacity={0.5}
        />
      </mesh>
      
      {/* 核心光源 - 多彩闪烁 */}
      <pointLight position={[0, 0, 0]} color="#ff00ff" intensity={8} distance={3} />
      <pointLight position={[0.1, 0, 0]} color="#00ffff" intensity={6} distance={2} />
      <pointLight position={[-0.1, 0, 0]} color="#ffff00" intensity={6} distance={2} />
    </group>
  );
}

// 立方体周围的汇聚粒子光效
function BoxParticles({ isMobile }) {
  const particlesRef = React.useRef();
  const particleCount = isMobile ? 100 : 200; // 移动端减少粒子数
  
  // 为每个粒子存储初始信息
  const particleData = React.useMemo(() => {
    const data = [];
    for (let i = 0; i < particleCount; i++) {
      // 随机起始距离和角度
      const distance = 3 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      
      data.push({
        startDistance: distance,
        theta: theta,
        phi: phi,
        speed: 1 + Math.random() * 1, // 随机速度
        offset: Math.random() * Math.PI * 2 // 随机偏移，让粒子不同步
      });
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      const sizes = particlesRef.current.geometry.attributes.size.array;
      const opacities = particlesRef.current.geometry.attributes.opacity.array;
      const time = clock.getElapsedTime();
      
      for (let i = 0; i < particleCount; i++) {
        const data = particleData[i];
        
        // 线性从外向内移动，到达后重置
        const cycleDuration = 3.0; // 每个循环3秒
        const progress = ((time * data.speed + data.offset) % cycleDuration) / cycleDuration; // 0到1的线性进度
        
        // 从起始距离向立方体周围移动（最近距离为2.0，保持在周围）
        const minDistance = 2.0; // 粒子最近只到立方体周围2个单位
        const currentDistance = data.startDistance - (data.startDistance - minDistance) * progress;
        
        // 计算球坐标转笛卡尔坐标
        const x = currentDistance * Math.sin(data.phi) * Math.cos(data.theta);
        const y = currentDistance * Math.sin(data.phi) * Math.sin(data.theta);
        const z = currentDistance * Math.cos(data.phi);
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        
        // 计算粒子到立方体的距离，用于淡出效果
        const distanceToCenter = Math.sqrt(x * x + y * y + z * z);
        
        // 在接近立方体时（距离2.5到2.0之间），开始淡出和缩小
        const fadeStart = 2.5;
        const fadeEnd = 2.0;
        
        if (distanceToCenter < fadeStart) {
          const fadeProgress = (distanceToCenter - fadeEnd) / (fadeStart - fadeEnd);
          const clampedProgress = Math.max(0, Math.min(1, fadeProgress));
          opacities[i] = clampedProgress; // 距离越近，透明度越低
          sizes[i] = 0.08 * clampedProgress; // 距离越近，粒子越小
        } else {
          opacities[i] = 1.0;
          sizes[i] = 0.08;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.size.needsUpdate = true;
      particlesRef.current.geometry.attributes.opacity.needsUpdate = true;
    }
  });

  const positions = React.useMemo(() => {
    return new Float32Array(particleCount * 3);
  }, []);

  const sizes = React.useMemo(() => {
    const arr = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      arr[i] = 0.08;
    }
    return arr;
  }, []);

  const opacities = React.useMemo(() => {
    const arr = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      arr[i] = 1.0;
    }
    return arr;
  }, []);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-opacity"
          count={particleCount}
          array={opacities}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        color="#4ecdc4" 
        transparent 
        opacity={0.8}
        sizeAttenuation
        vertexColors={false}
        blending={2}
      />
    </points>
  );
}

// 添加圆球
function Floor() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, 0]} receiveShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffff00"
          emissiveIntensity={1}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      {/* 在圆球位置添加点光源 */}
      <pointLight position={[0, -1.4, 0]} color="#ffff00" intensity={2} distance={10} />
    </>
  );
}

// 场景控制器 - 根据相机距离切换场景
function SceneController({ isMobile }) {
  const [isInside, setIsInside] = useState(false);
  
  useFrame(({ camera }) => {
    // 计算相机到立方体中心的距离
    const distance = Math.sqrt(
      camera.position.x * camera.position.x +
      camera.position.y * camera.position.y +
      camera.position.z * camera.position.z
    );
    
    // 当距离小于1.5时，认为进入了立方体内部
    const shouldBeInside = distance < 1.5;
    if (shouldBeInside !== isInside) {
      setIsInside(shouldBeInside);
    }
  });
  
  return (
    <>
      {isInside ? (
        // 内部景观
        <InnerScape isMobile={isMobile} />
      ) : (
        // 外部景观
        <>
          <MyRotatingBox />
          <BoxParticles isMobile={isMobile} />
          <Particles isMobile={isMobile} />
          <Floor />
        </>
      )}
    </>
  );
}

// 外部正方体容器
function CubeContainer() {
  const meshRef = React.useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // 缓慢旋转正方体
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[4, 4, 4]} />
      <meshStandardMaterial 
        color="#1a4d6d"
        transparent
        opacity={0.15}
        metalness={0.8}
        roughness={0.2}
        wireframe={false}
        side={2}
      />
    </mesh>
  );
}

// 正方体边缘线
function CubeEdges() {
  const meshRef = React.useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // 与容器同步旋转
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });
  
  return (
    <lineSegments ref={meshRef}>
      <edgesGeometry args={[new THREE.BoxGeometry(4, 4, 4)]} />
      <lineBasicMaterial 
        color="#00d4ff"
        transparent
        opacity={0.5}
      />
    </lineSegments>
  );
}

// 深色背景层 - 在正方体内部渲染
function DarkBackground() {
  const meshRef = React.useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // 与主正方体同步旋转
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });
  
  return (
    <mesh ref={meshRef} renderOrder={-10}>
      <boxGeometry args={[3.9, 3.9, 3.9]} />
      <meshBasicMaterial 
        color="#0a0a1a"
        side={1}
      />
    </mesh>
  );
}

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 检测是否为移动设备
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

	return (
		<div id="canvas-container">
			<Canvas
        shadows={!isMobile} // 移动端禁用阴影以提高性能
        camera={{ position: [0, 0, isMobile ? 12 : 10], fov: isMobile ? 60 : 50 }} // 移动端调整相机
        gl={{ 
          alpha: true,
          antialias: !isMobile, // 移动端禁用抗锯齿以提高性能
          powerPreference: isMobile ? 'low-power' : 'high-performance'
        }}
        style={{ background: '#ffffff' }}
        dpr={isMobile ? [1, 1.5] : [1, 2]} // 移动端限制设备像素比
      >
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1}
          castShadow={!isMobile}
          shadow-mapSize-width={isMobile ? 128 : 300}
          shadow-mapSize-height={isMobile ? 128 : 300}
        />
        {!isMobile && <pointLight position={[-10, 0, -5]} color="#ffffff" intensity={1} />}
        {!isMobile && <pointLight position={[10, 0, -5]} color="#06ffa5" intensity={1} />}
        <spotLight 
          position={[0, 5, 0]} 
          angle={0.3} 
          penumbra={1} 
          intensity={0.5}
          castShadow={!isMobile}
        />
        
        {/* 添加轨道控制器 - 拖拽旋转视角 */}
        <OrbitControls 
          enableZoom={true}
          enablePan={!isMobile} // 移动端禁用平移,避免与触摸滚动冲突
          enableRotate={true}
          maxDistance={20}
          minDistance={0.5}
          autoRotate={false}
          autoRotateSpeed={0.5}
          enableDamping={true} // 添加阻尼效果,使交互更流畅
          dampingFactor={0.05}
          rotateSpeed={isMobile ? 0.5 : 1} // 移动端降低旋转速度
          zoomSpeed={isMobile ? 0.5 : 1}
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
          }}
        />
        
        {/* 深色背景层 - 在正方体内部 */}
        <DarkBackground />
        
        {/* 场景控制器 */}
        <SceneController isMobile={isMobile} />
        
        {/* 外部正方体容器 */}
        <CubeContainer />
        <CubeEdges />
			</Canvas>
		</div>
	);
}

export default App;