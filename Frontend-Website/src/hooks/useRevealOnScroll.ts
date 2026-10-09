import { useLayoutEffect } from 'react'

// Scroll-reveal for any element marked in the markup:
//   data-reveal="up|left|right|scale|fade"   animate this element when it enters the viewport (once)
//   data-reveal-stagger="up|left|right|scale|fade"   animate each child in turn (100ms apart)
//   data-reveal-delay="250"   extra delay in ms
// Call once per page (App does). Honours prefers-reduced-motion: content simply shows.
const STAGGER_MS = 100

export default function useRevealOnScroll() {
  useLayoutEffect(() => {
    const root = document.documentElement

    // Expand stagger containers into per-child reveals before observing
    document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((container) => {
      const variant = container.dataset.revealStagger || 'up'
      Array.from(container.children).forEach((child, index) => {
        if (!(child instanceof HTMLElement) || child.hasAttribute('data-reveal')) return
        // Absolutely positioned decorations (rules, blocks) stay put
        if (getComputedStyle(child).position === 'absolute') return
        child.dataset.reveal = variant
        child.dataset.revealDelay = String(index * STAGGER_MS)
      })
    })

    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }

    root.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    targets.forEach((el) => {
      const delay = Number(el.dataset.revealDelay || 0)
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)
      observer.observe(el)
    })

    return () => {
      observer.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])
}
