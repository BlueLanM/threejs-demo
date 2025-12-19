import { useState, useEffect } from 'react'
import { isPhone, getDeviceType, getDeviceInfo } from './utils/deviceDetect'
import './DeviceDetectDemo.css'

function DeviceDetectDemo() {
  const [deviceInfo, setDeviceInfo] = useState(null)

  useEffect(() => {
    // 获取设备信息
    const info = getDeviceInfo()
    setDeviceInfo(info)

    // 监听窗口大小变化
    const handleResize = () => {
      setDeviceInfo(getDeviceInfo())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobileDevice = isPhone()
  const deviceType = getDeviceType()

  return (
    <div className="device-detect-container">
      <h1>设备检测演示</h1>
      
      <div className={`device-badge ${isMobileDevice ? 'mobile' : 'desktop'}`}>
        {isMobileDevice ? '📱 移动设备' : '🖥️ 桌面设备'}
      </div>

      <div className="device-type">
        <h2>设备类型: <span className="highlight">{deviceType}</span></h2>
      </div>

      {deviceInfo && (
        <div className="device-info-grid">
          <div className="info-card">
            <h3>平台信息</h3>
            <ul>
              <li>
                <strong>iOS:</strong> 
                <span className={deviceInfo.isIOS ? 'yes' : 'no'}>
                  {deviceInfo.isIOS ? '✓' : '✗'}
                </span>
              </li>
              <li>
                <strong>Android:</strong> 
                <span className={deviceInfo.isAndroid ? 'yes' : 'no'}>
                  {deviceInfo.isAndroid ? '✓' : '✗'}
                </span>
              </li>
              <li>
                <strong>Windows Phone:</strong> 
                <span className={deviceInfo.isWindows ? 'yes' : 'no'}>
                  {deviceInfo.isWindows ? '✓' : '✗'}
                </span>
              </li>
            </ul>
          </div>

          <div className="info-card">
            <h3>屏幕尺寸</h3>
            <ul>
              <li><strong>屏幕宽度:</strong> {deviceInfo.screenWidth}px</li>
              <li><strong>屏幕高度:</strong> {deviceInfo.screenHeight}px</li>
              <li><strong>窗口宽度:</strong> {deviceInfo.windowWidth}px</li>
              <li><strong>窗口高度:</strong> {deviceInfo.windowHeight}px</li>
            </ul>
          </div>

          <div className="info-card full-width">
            <h3>User Agent</h3>
            <p className="user-agent">{deviceInfo.userAgent}</p>
          </div>
        </div>
      )}

      <div className="responsive-demo">
        <h2>响应式演示</h2>
        <p>
          {isMobileDevice 
            ? '您正在使用移动设备浏览此页面。内容已针对移动端优化。' 
            : '您正在使用桌面设备浏览此页面。享受更大的显示空间！'}
        </p>
      </div>
    </div>
  )
}

export default DeviceDetectDemo
