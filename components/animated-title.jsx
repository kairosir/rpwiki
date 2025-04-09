'use client'

import { TypeAnimation } from 'react-type-animation'
import { useState, useEffect } from 'react'

export function AnimatedTitle() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <span>GTA RP Wiki</span>
  }

  return (
    <TypeAnimation
      sequence={[
        'GTA RP Wiki',
        1000,
        'GTA RP Wiki',
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ display: 'inline-block' }}
      repeat={Infinity}
    />
  )
} 