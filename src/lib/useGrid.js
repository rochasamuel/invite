import { useEffect, useState } from 'react'

// Viewport and the width of the embossed frame band around the full-screen sheet.
function measure() {
  const W = document.documentElement.clientWidth
  const H = window.innerHeight
  const band = Math.round(Math.min(80, Math.max(50, W * 0.135)))
  return { W, H, band, paper: { x: 0, y: 0, w: W, h: H } }
}

export function useGrid() {
  const [grid, setGrid] = useState(measure)

  useEffect(() => {
    let frame = 0
    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setGrid(measure()))
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--band', `${grid.band}px`)
  }, [grid.band])

  return grid
}
