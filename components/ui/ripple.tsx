'use client'

interface RippleProps {
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
}

export function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
}: RippleProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/5 [mask-image:linear-gradient(to_bottom,white,transparent)]">
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70
        const opacity = mainCircleOpacity - i * 0.03
        const animationDelay = `${i * 0.06}s`
        const borderStyle = i === numCircles - 1 ? 'dashed' : 'solid'
        const borderOpacity = (5 + i * 5) / 100

        return (
          <div
            key={i}
            className="absolute animate-ripple rounded-full bg-foreground/25 shadow-xl border"
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                borderStyle,
                borderWidth: '1px',
                borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(1)',
                '--i': i,
              } as React.CSSProperties
            }
          />
        )
      })}
    </div>
  )
}
