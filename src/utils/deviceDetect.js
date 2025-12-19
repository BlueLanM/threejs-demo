/**
 * 检测是否为移动设备
 * @returns {boolean} 如果是移动设备返回 true，否则返回 false
 */
export const isPhone = () => {
  return /Mobile|Android|iOS|iPhone|iPad|iPod|Windows Phone|KFAPWI/i.test(
    navigator.userAgent
  )
}

/**
 * 获取设备类型
 * @returns {string} 返回设备类型：'mobile' | 'tablet' | 'desktop'
 */
export const getDeviceType = () => {
  const ua = navigator.userAgent
  
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  
  if (/Mobile|Android|iOS|iPhone|iPod|Windows Phone|KFAPWI/i.test(ua)) {
    return 'mobile'
  }
  
  return 'desktop'
}

/**
 * 获取详细的设备信息
 * @returns {object} 返回设备信息对象
 */
export const getDeviceInfo = () => {
  const ua = navigator.userAgent
  
  return {
    isMobile: isPhone(),
    deviceType: getDeviceType(),
    isIOS: /iPhone|iPad|iPod/i.test(ua),
    isAndroid: /Android/i.test(ua),
    isWindows: /Windows Phone/i.test(ua),
    userAgent: ua,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight
  }
}
