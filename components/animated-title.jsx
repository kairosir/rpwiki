'use client'

import { TypeAnimation } from 'react-type-animation'

export function AnimatedTitle() {
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