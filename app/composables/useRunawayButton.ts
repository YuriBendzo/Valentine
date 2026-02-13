
import { ref } from 'vue'
import { useWindowSize, useMouse } from '@vueuse/core'
import gsap from 'gsap'

export const useRunawayButton = () => {
  const { width: winWidth, height: winHeight } = useWindowSize()
  const { x: mouseX, y: mouseY } = useMouse()
  
  const isRunning = ref(false)
  
  const runaway = (element: HTMLElement) => {
    if (!element) return
    isRunning.value = true

    const rect = element.getBoundingClientRect()
    const btnWidth = rect.width
    const btnHeight = rect.height
    
    const maxX = winWidth.value - btnWidth - 50
    const maxY = winHeight.value - btnHeight - 50
    const minX = 50
    const minY = 50

    let newX = Math.random() * (maxX - minX) + minX
    let newY = Math.random() * (maxY - minY) + minY

    const distToMouse = Math.sqrt(
      Math.pow(newX - mouseX.value, 2) + Math.pow(newY - mouseY.value, 2)
    )
    
    if (distToMouse < 300) {
      newX = winWidth.value - newX
      newY = winHeight.value - newY
      newX = Math.max(minX, Math.min(newX, maxX))
      newY = Math.max(minY, Math.min(newY, maxY))
    }

    gsap.to(element, {
      x: newX - (winWidth.value / 2) + (btnWidth/2), 
      duration: 0.3,
      ease: 'power2.out',
      position: 'fixed',
      left: newX,
      top: newY,
      overwrite: true
    })
  }

  return {
    runaway
  }
}
