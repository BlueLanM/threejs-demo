# 🚗 3D 交互式车模型

一个基于 React + Three.js 构建的交互式 3D 车模型项目，支持多种车辆控制和动画效果。

## ✨ 功能特性

### 🎮 车辆控制
- **引擎控制**：启动/关闭引擎，引擎运行时有真实的振动效果
- **灯光系统**：
  - 前大灯/尾灯开关
  - 双闪警示灯功能
  - 灯光发光和点光源效果
- **车门控制**：
  - 左右前门平滑开关
  - 引擎盖向上打开
  - 后备箱向上打开
  - 引擎运行时自动锁定车门
- **移动控制**：
  - 前进/后退（需启动引擎）
  - 车轮实时旋转动画
  - 轮胎纹路线条展示滚动效果

### 🎨 视觉效果
- **高质量材质**：
  - PBR 物理渲染材质
  - 金属反光效果
  - 车身高光泽度
- **车轮细节**：
  - 16条径向纹路线条
  - 金属轮毂和辐条
  - 刹车盘系统
  - 旋转时清晰的滚动效果
- **光照系统**：
  - 环境光 + 多方向光源
  - 实时阴影渲染
  - 点光源和聚光灯

### 🖱️ 交互控制
- **鼠标操作**：
  - 左键拖拽：旋转视角
  - 滚轮：缩放视图
  - 右键拖拽：平移场景
- **触摸支持**：支持移动设备触摸控制

## 🛠️ 技术栈

- **React 18** - UI 框架
- **Vite** - 构建工具
- **Three.js** - 3D 图形库
- **@react-three/fiber** - React 的 Three.js 渲染器
- **@react-three/drei** - Three.js 辅助组件库

## 📦 安装

```bash
# 克隆项目
git clone <your-repo-url>

# 进入项目目录
cd threejs-demo

# 安装依赖
npm install
```

## 🚀 运行

### 开发模式
```bash
npm run dev
```
访问 `http://localhost:5173` 查看项目

### 构建生产版本
```bash
npm run build
```
构建产物将输出到 `docs` 文件夹

### 预览生产版本
```bash
npm run preview
```

## 📂 项目结构

```
threejs-demo/
├── src/
│   ├── App.jsx           # 主应用组件
│   ├── Car3D.jsx         # 3D 车模型组件
│   ├── main.jsx          # 应用入口
│   └── index.css         # 全局样式
├── public/               # 静态资源
├── vite.config.js        # Vite 配置
└── package.json          # 项目依赖
```

## 🎯 核心组件

### Car3D.jsx
主要的 3D 场景组件，包含：
- `Car` - 完整车辆组件
- `CarBody` - 车身和灯光系统
- `Wheel` - 车轮组件（含旋转动画）
- `LeftFrontDoor` / `RightFrontDoor` - 车门组件
- `Hood` - 引擎盖组件
- `Trunk` - 后备箱组件

## 🎮 使用说明

1. **启动引擎**：点击"启动引擎"按钮，车辆开始振动
2. **开启车灯**：引擎运行时可开启前灯/尾灯或双闪
3. **车门操作**：引擎关闭时可打开/关闭车门、引擎盖、后备箱
4. **驾驶车辆**：
   - 按住"前进"按钮 - 车辆前进，车轮正向旋转
   - 按住"后退"按钮 - 车辆后退，车轮反向旋转

## 🎨 自定义配置

### 修改车身颜色
在 `src/Car3D.jsx` 中的 `CarBody` 组件，修改 `color` 属性：
```javascript
<meshStandardMaterial 
  color="#e74c3c"  // 修改这里的颜色值
  metalness={0.85} 
  roughness={0.2} 
/>
```

### 调整构建输出目录
在 `vite.config.js` 中修改：
```javascript
build: {
  outDir: 'docs'  // 修改输出目录名称
}
```

## 🌟 特色亮点

- ✅ 流畅的 60fps 动画效果
- ✅ 真实的物理渲染材质
- ✅ 完整的车辆控制系统
- ✅ 响应式 UI 设计
- ✅ 高性能渲染优化
- ✅ 支持移动端触摸操作

## 📝 License

MIT

## 👨‍💻 开发者

欢迎提交 Issue 和 Pull Request！
```

---

## 📚 相关资源

- [Three.js 官方文档](https://threejs.org/docs/)
- [React Three Fiber 文档](https://docs.pmnd.rs/react-three-fiber/)
- [Vite 官方文档](https://vitejs.dev/)
