'use client'

import { TypeAnimation } from 'react-type-animation'
import { useState, useEffect } from 'react'

export function AnimatedTitle() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-[150px]">
        <span>GTA RP Wiki</span>
      </div>
    )
  }

  return (
    <div className="w-[150px]">
      <TypeAnimation
        sequence={[
          'G',
          200,
          'GT',
          200,
          'GTA',
          400,
          'GTA ',
          200,
          'GTA R',
          200,
          'GTA RP',
          400,
          'GTA RP ',
          200,
          'GTA RP W',
          200,
          'GTA RP Wi',
          200,
          'GTA RP Wik',
          200,
          'GTA RP Wiki',
          3000,
          '',
          1000,
        ]}
        wrapper="span"
        speed={150}
        style={{ display: 'inline-block' }}
        repeat={Infinity}
        cursor={true}
      />
    </div>
  )
} 