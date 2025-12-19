# 🎨 Three.js 交互式 3D 展示项目

一个基于 React + Three.js 构建的交互式 3D 可视化项目，包含多个精彩的3D场景和交互式车模型演示。

## 🌐 在线预览

访问：[https://bluelanm.github.io/threejs-demo](https://bluelanm.github.io/threejs-demo)

## 🎪 场景展示

### 🎭 主场景（App）
- **旋转立方体**：带有动画效果的3D旋转方块
- **粒子系统**：动态粒子特效展示
- **内景空间**：沉浸式3D空间场景
- **立方体粒子**：粒子构成的立方体效果
- **地板系统**：带有网格和反射的地面
- **场景控制器**：动态场景切换和控制
- **容器边缘**：立方体边缘高亮效果
- **暗黑背景**：深邃的背景渲染

### 🚗 车模型场景（Car3D）
完整的交互式3D车辆模型，具有真实的控制系统和动画效果。

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

- **React 19.1** - UI 框架
- **Vite 6.3** - 快速构建工具
- **Three.js 0.182** - 强大的3D图形库
- **@react-three/fiber 9.4** - React 的 Three.js 渲染器
- **@react-three/drei 10.7** - Three.js 辅助组件库
- **@react-spring/three 10.0** - 3D 动画库
- **React Router 6.30** - 路由管理

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
│   ├── App.jsx           # 主场景组件（粒子、立方体等）
│   ├── Car3D.jsx         # 3D 车模型组件
│   ├── Layout.jsx        # 布局组件
│   ├── Router.jsx        # 路由配置
│   ├── main.jsx          # 应用入口
│   ├── App.css           # 应用样式
│   ├── Layout.css        # 布局样式
│   └── index.css         # 全局样式
├── docs/                 # 构建输出目录（GitHub Pages）
├── public/               # 静态资源
├── vite.config.js        # Vite 配置
├── eslint.config.js      # ESLint 配置
├── package.json          # 项目依赖
└── README.md             # 项目文档
```

## 🎯 核心组件

### App.jsx - 主场景组件
包含多个3D特效组件：
- `MyRotatingBox` - 旋转立方体组件
- `Particles` - 粒子系统
- `InnerScape` - 内景空间
- `BoxParticles` - 立方体粒子效果
- `Floor` - 地板系统
- `SceneController` - 场景控制器
- `CubeContainer` - 立方体容器
- `CubeEdges` - 立方体边缘
- `DarkBackground` - 背景渲染

### Car3D.jsx - 车模型组件
完整的3D车辆系统：
- `Car` - 完整车辆组件
- `CarBody` - 车身和灯光系统
- `Wheel` - 车轮组件（含旋转动画和纹路）
- `LeftFrontDoor` / `RightFrontDoor` - 车门组件
- `Hood` - 引擎盖组件
- `Trunk` - 后备箱组件

### Router.jsx
路由管理，支持多场景切换

### Layout.jsx
统一的页面布局组件

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

- ✅ 多个精彩的3D场景展示
- ✅ 流畅的 60fps 动画效果
- ✅ 真实的物理渲染材质（PBR）
- ✅ 完整的车辆控制系统
- ✅ 粒子系统和特效
- ✅ 响应式 UI 设计
- ✅ 高性能渲染优化
- ✅ 支持移动端触摸操作
- ✅ 路由导航支持多场景切换
- ✅ GitHub Pages 部署就绪

## 🚀 部署

项目已配置 GitHub Pages 部署：

1. 构建项目：`npm run build`
2. 提交 `docs` 文件夹到 GitHub
3. 在仓库设置中启用 GitHub Pages，选择 `docs` 文件夹作为源

## 🐛 调试

运行 ESLint 检查代码质量：
```bash
npm run lint
```

## 📝 License

MIT

## 👨‍💻 开发者

欢迎提交 Issue 和 Pull Request！

### 贡献指南
1. Fork 本项目
2. 创建特性分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 提交 Pull Request

---

## 📚 相关资源

- [Three.js 官方文档](https://threejs.org/docs/)
- [React Three Fiber 文档](https://docs.pmnd.rs/react-three-fiber/)
- [React Three Drei 文档](https://github.com/pmndrs/drei)
- [React Spring 文档](https://www.react-spring.dev/)
- [Vite 官方文档](https://vitejs.dev/)
- [React Router 文档](https://reactrouter.com/)

## 💡 技术要点

- 使用 `useFrame` 实现流畅的动画循环
- 使用 `useRef` 管理 3D 对象引用
- 使用 `OrbitControls` 实现相机控制
- 使用 `meshStandardMaterial` 实现 PBR 材质
- 使用 `pointLight` 和 `spotLight` 创建动态光照
- 使用 React Spring 实现平滑的状态过渡动画
