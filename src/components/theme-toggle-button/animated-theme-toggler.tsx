import { Moon, Sun } from 'lucide-react'
import { type ComponentPropsWithoutRef, useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'

import { cn } from '@/lib/utils'

interface AnimatedThemeTogglerProps extends ComponentPropsWithoutRef<'button'> {
  duration?: number
  isDark: boolean
  onToggle: () => void
  srLabel?: string
}

const createJaggedCirclePath = (
  x: number,
  y: number,
  radius: number,
  spikes: number,
  randomFactors: number[],
) => {
  const points: string[] = []
  const total = spikes * 2
  const angleStep = (2 * Math.PI) / total

  for (let i = 0; i < total; i++) {
    const angle = i * angleStep
    const currentRadius = radius * (i % 2 === 0 ? 1 : (randomFactors[i] ?? 1))
    const pointX = x + currentRadius * Math.cos(angle)
    const pointY = y + currentRadius * Math.sin(angle)

    if (i === 0) {
      points.push(`M ${pointX} ${pointY}`)
    } else {
      points.push(`L ${pointX} ${pointY}`)
    }
  }

  points.push('Z')
  return points.join(' ')
}

export function AnimatedThemeToggler({
  className,
  duration = 400,
  isDark,
  onToggle,
  srLabel = 'Toggle theme',
  ...props
}: AnimatedThemeTogglerProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current

    if (!button) {
      return
    }

    const { top, left, width, height } = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight
    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y),
    )

    if (typeof document.startViewTransition !== 'function') {
      onToggle()
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        onToggle()
      })
    })

    transition.ready.then(() => {
      const spikes = 1_000
      const randomFactors = Array.from({ length: spikes * 2 }, (_, index) =>
        index % 2 === 0 ? 1 : 0.85 + Math.random() * 0.1,
      )
      const smallPath = createJaggedCirclePath(x, y, 0, spikes, randomFactors)
      const largePath = createJaggedCirclePath(
        x,
        y,
        maxRadius,
        spikes,
        randomFactors,
      )
      const clipPath = [`path("${smallPath}")`, `path("${largePath}")`]
      const animatedClipPath = isDark ? clipPath : [...clipPath].reverse()
      const pseudoElement = isDark
        ? '::view-transition-new(root)'
        : '::view-transition-old(root)'

      document.documentElement.animate(
        {
          clipPath: animatedClipPath,
        },
        {
          duration,
          easing: 'ease-in-out',
          fill: 'forwards',
          pseudoElement,
        },
      )
    })
  }, [duration, isDark, onToggle])

  return (
    <button
      ref={buttonRef}
      className={cn(className)}
      onClick={toggleTheme}
      type="button"
      {...props}
    >
      {isDark ? <Sun /> : <Moon />}
      <span className="sr-only">{srLabel}</span>
    </button>
  )
}
