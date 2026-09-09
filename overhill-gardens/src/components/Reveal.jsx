import { useEffect, useRef, useState } from 'react'

export default function Reveal({ children, delay = 0, direction = 'up', style = {} }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const offset = direction === 'left' ? '-24px' : direction === 'right' ? '24px' : '24px'
  const transform = direction === 'left' || direction === 'right'
    ? `translateX(${visible ? '0' : offset})`
    : `translateY(${visible ? '0' : offset})`

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}