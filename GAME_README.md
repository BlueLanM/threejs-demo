# Three.js 飞机大战游戏

一个使用 Three.js 和 React 开发的 3D 飞机大战游戏。

## 游戏特性

- 🎮 **双重控制方式**：支持鼠标和键盘控制
- 🚀 **玩家飞机**：绿色战斗机，可自由移动并发射子弹
- 👾 **敌机系统**：红色敌机自动生成并向玩家飞来，会反击射击
- 💥 **爆炸效果**：炫酷的粒子爆炸动画
- ⭐ **星空背景**：动态移动的星空，营造太空战斗氛围
- 🎯 **碰撞检测**：精准的碰撞检测系统
- 💖 **生命系统**：玩家有 3 条生命
- 🏆 **得分系统**：消灭敌机获得分数
- ⏸️ **暂停功能**：随时暂停游戏

## 如何使用

### 1. 在你的 App.jsx 或其他路由文件中引入游戏组件

```jsx
import PlaneGame from './pages/PlaneGame';

function App() {
  return <PlaneGame />;
}

export default App;
```

### 2. 或者创建一个单独的路由页面

如果你使用 React Router，可以这样添加路由：

```jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PlaneGame from './pages/PlaneGame';
import App from './App';

function AppRouter() {
  return (
    <Router>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/game">飞机大战</Link>
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game" element={<PlaneGame />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
```

## 游戏操作

### 移动控制
- **鼠标移动**：飞机会跟随鼠标移动
- **键盘控制**：
  - `W` / `↑` - 向上移动
  - `S` / `↓` - 向下移动
  - `A` / `←` - 向左移动
  - `D` / `→` - 向右移动

### 射击控制
- **鼠标点击**：发射子弹
- **空格键**：连续射击

### 游戏控制
- **P 键**：暂停/继续游戏
- **右上角按钮**：暂停/继续游戏

## 游戏规则

1. 玩家飞机（绿色）从下方出发，敌机（红色）从上方不断飞来
2. 击中敌机得 10 分
3. 被敌机子弹击中或与敌机相撞会失去 1 条生命
4. 生命值归零游戏结束
5. 游戏结束后可点击"重新开始"按钮再次游戏

## 技术实现

- **Three.js**：3D 渲染引擎
- **React**：UI 框架和状态管理
- **几何体**：使用 ConeGeometry（飞机机身）和 BoxGeometry（机翼）
- **材质**：MeshPhongMaterial 实现光照效果
- **粒子系统**：自定义爆炸粒子效果
- **碰撞检测**：基于距离的碰撞检测算法

## 游戏架构

```
src/pages/
├── PlaneGame.jsx      # 主游戏组件
└── PlaneGame.css      # 游戏样式
```

### 核心功能模块

1. **场景管理**：Three.js 场景、相机、渲染器设置
2. **飞机系统**：玩家飞机和敌机的创建与管理
3. **武器系统**：子弹发射和移动逻辑
4. **碰撞系统**：检测子弹、飞机之间的碰撞
5. **视觉效果**：爆炸粒子、星空背景、光照系统
6. **游戏状态**：得分、生命值、暂停、游戏结束等状态管理

## 扩展建议

想要增强游戏体验？可以考虑以下改进：

1. **增加道具系统**
   - 生命值补充
   - 武器升级
   - 护盾道具

2. **多样化敌机**
   - 不同类型的敌机
   - Boss 战
   - 编队飞行

3. **增强视觉效果**
   - 添加音效
   - 更炫酷的爆炸效果
   - 背景音乐

4. **关卡系统**
   - 多个关卡
   - 难度递增
   - 关卡间剧情

5. **成就系统**
   - 记录最高分
   - 解锁成就
   - 排行榜

## 运行项目

```bash
# 安装依赖（如果还没安装）
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

建议使用现代浏览器以获得最佳性能和体验。

## License

MIT

---

**享受游戏！祝你玩得开心！** 🎮✨
