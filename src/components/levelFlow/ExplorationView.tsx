import React, { useState, useEffect, useRef, useCallback } from 'react'
import { sounds } from '../../utils/sound'
import type { LevelDetailData } from '../../data/levelFlowData'

interface ExplorationViewProps {
  levelData: LevelDetailData
  onFinishExploration: (coinsEarned: number, shapesCollected: number, remainingLives: number) => void
  onExit: () => void
}

interface Platform {
  x: number
  y: number
  width: number
  height: number
}

interface CollectibleItem {
  id: string
  x: number
  y: number
  type: 'coin' | 'segitiga' | 'persegi' | 'lingkaran'
  icon: string
  collected: boolean
}

export const ExplorationView: React.FC<ExplorationViewProps> = ({
  levelData,
  onFinishExploration,
  onExit,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [coinsCollected, setCoinsCollected] = useState(0)
  const [shapesCollected, setShapesCollected] = useState(0)
  const [lives, setLives] = useState(levelData.initialLives || 3)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showCompleteBanner, setShowCompleteBanner] = useState(false)

  // Player Character physics state
  const playerRef = useRef({
    x: 40,
    y: 200,
    vx: 0,
    vy: 0,
    width: 36,
    height: 38,
    isGrounded: false,
    facing: 'right' as 'left' | 'right'
  })

  // Platforms matching the floating islands layout in Screen 3
  const platformsRef = useRef<Platform[]>([
    { x: 20, y: 320, width: 100, height: 24 },    // Starting Island (left)
    { x: 140, y: 260, width: 90, height: 22 },    // Mid-low Floating Island
    { x: 245, y: 190, width: 85, height: 22 },    // Mid-high Floating Island
    { x: 100, y: 140, width: 80, height: 20 },    // Top-left Floating Island
    { x: 300, y: 290, width: 100, height: 25 },   // Checkpoint Island (right with flag)
  ])

  // Collectibles on the islands: 5 coins + target shapes matching levelData
  const getInitialCollectibles = (): CollectibleItem[] => {
    const shapePositions = [
      { x: 180, y: 175 },
      { x: 270, y: 110 },
      { x: 130, y: 95 },
    ]
    return [
      { id: 'c1', x: 50, y: 270, type: 'coin', icon: '🪙', collected: false },
      { id: 'c2', x: 80, y: 270, type: 'coin', icon: '🪙', collected: false },
      { id: 'c3', x: 160, y: 215, type: 'coin', icon: '🪙', collected: false },
      { id: 'c4', x: 200, y: 215, type: 'coin', icon: '🪙', collected: false },
      { id: 'c5', x: 280, y: 145, type: 'coin', icon: '🪙', collected: false },
      ...levelData.targetShapes.map((t, idx) => ({
        id: `s-${idx + 1}`,
        x: shapePositions[idx]?.x || (100 + idx * 80),
        y: shapePositions[idx]?.y || (160 - idx * 30),
        type: 'segitiga' as const,
        icon: t.icon,
        collected: false,
      })),
    ]
  }

  const collectiblesRef = useRef<CollectibleItem[]>(getInitialCollectibles())

  // Key controls state
  const keysRef = useRef<{ left: boolean; right: boolean; jump: boolean }>({
    left: false,
    right: false,
    jump: false
  })

  // Keyboard event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = true
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = true
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        keysRef.current.jump = true
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false
      }
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W' || e.key === ' ') {
        keysRef.current.jump = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Touch control handlers
  const handleControlDown = (dir: 'left' | 'right' | 'jump') => {
    if (dir === 'jump') {
      sounds.playJump()
      keysRef.current.jump = true
    } else {
      keysRef.current[dir] = true
    }
  }

  const handleControlUp = (dir: 'left' | 'right' | 'jump') => {
    keysRef.current[dir] = false
  }

  // Reset game on Game Over retry
  const handleRetryExploration = () => {
    sounds.playClick()
    setLives(levelData.initialLives || 3)
    setIsGameOver(false)
    setCoinsCollected(0)
    setShapesCollected(0)
    playerRef.current.x = 40
    playerRef.current.y = 200
    playerRef.current.vx = 0
    playerRef.current.vy = 0
    // Reset collectibles
    collectiblesRef.current.forEach((item) => {
      item.collected = false
    })
  }

  // Complete exploration and proceed
  const handleComplete = useCallback(() => {
    sounds.playSuccess()
    setShowCompleteBanner(true)
    setTimeout(() => {
      onFinishExploration(coinsCollected || 12, shapesCollected || 5, lives)
    }, 1200)
  }, [coinsCollected, shapesCollected, lives, onFinishExploration])

  // Main 60FPS Game Loop
  useEffect(() => {
    let animationId: number
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gravity = 0.45
    const moveSpeed = 3.2
    const jumpForce = -9.2

    let currentCoins = coinsCollected
    let currentShapes = shapesCollected

    const gameLoop = () => {
      if (!isPaused && !showCompleteBanner && !isGameOver) {
        const p = playerRef.current

        // Horizontal input
        if (keysRef.current.left) {
          p.vx = -moveSpeed
          p.facing = 'left'
        } else if (keysRef.current.right) {
          p.vx = moveSpeed
          p.facing = 'right'
        } else {
          p.vx *= 0.7
        }

        // Jump input
        if (keysRef.current.jump && p.isGrounded) {
          p.vy = jumpForce
          p.isGrounded = false
          sounds.playJump()
        }

        // Apply gravity
        p.vy += gravity
        p.x += p.vx
        p.y += p.vy

        // Keep inside canvas bounds
        if (p.x < 10) p.x = 10
        if (p.x > canvas.width - p.width - 10) p.x = canvas.width - p.width - 10

        // Platform collision
        p.isGrounded = false
        platformsRef.current.forEach((plat) => {
          // Top edge collision
          if (
            p.x + p.width > plat.x &&
            p.x < plat.x + plat.width &&
            p.y + p.height >= plat.y &&
            p.y + p.height <= plat.y + 14 &&
            p.vy >= 0
          ) {
            p.y = plat.y - p.height
            p.vy = 0
            p.isGrounded = true
          }
        })

        // Pit fall protection & life deduction (Heart loss)
        if (p.y > canvas.height + 20) {
          p.x = 40
          p.y = 200
          p.vy = 0
          sounds.playWrong()
          setLives((prevLives) => {
            const nextLives = Math.max(0, prevLives - 1)
            if (nextLives === 0) {
              setIsGameOver(true)
            }
            return nextLives
          })
        }

        // Collectibles collision
        collectiblesRef.current.forEach((item) => {
          if (!item.collected) {
            const dist = Math.hypot(p.x + p.width / 2 - item.x, p.y + p.height / 2 - item.y)
            if (dist < 26) {
              item.collected = true
              if (item.type === 'coin') {
                sounds.playCoin()
                currentCoins += 1
                setCoinsCollected(currentCoins)
              } else {
                sounds.playStarCoin()
                currentShapes += 1
                setShapesCollected(currentShapes)
                if (currentShapes >= levelData.totalTargetShapes) {
                  handleComplete()
                }
              }
            }
          }
        })

        // Checkpoint Flag reached (at rightmost island: x > 340, y > 240)
        if (p.x >= 320 && p.y >= 230 && p.isGrounded) {
          if (!showCompleteBanner) {
            handleComplete()
          }
        }
      }

      // --- RENDERING CANVAS SCENE ---
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 1. Sky & Clouds
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#38bdf8')
      gradient.addColorStop(0.6, '#7dd3fc')
      gradient.addColorStop(1, '#bae6fd')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Background waterfall
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)'
      ctx.fillRect(170, 260, 24, 140)
      ctx.fillStyle = 'rgba(186, 230, 253, 0.6)'
      ctx.fillRect(174, 260, 16, 140)

      // Background Castle Turret on right
      ctx.font = '36px sans-serif'
      ctx.fillText('🏰', 335, 275)

      // Checkpoint Flag
      ctx.font = '24px sans-serif'
      ctx.fillText('🚩', 370, 280)

      // 2. Draw Floating Platforms
      platformsRef.current.forEach((plat) => {
        // Grassy top
        ctx.fillStyle = '#4ade80'
        ctx.beginPath()
        ctx.roundRect(plat.x, plat.y, plat.width, 8, 4)
        ctx.fill()

        // Earth body with cartoon rocky border
        ctx.fillStyle = '#92400e'
        ctx.beginPath()
        ctx.roundRect(plat.x + 4, plat.y + 8, plat.width - 8, plat.height - 8, [0, 0, 8, 8])
        ctx.fill()

        // Platform underside rock roots
        ctx.fillStyle = '#78350f'
        ctx.beginPath()
        ctx.moveTo(plat.x + 10, plat.y + plat.height)
        ctx.lineTo(plat.x + plat.width / 2, plat.y + plat.height + 12)
        ctx.lineTo(plat.x + plat.width - 10, plat.y + plat.height)
        ctx.fill()
      })

      // 3. Draw Collectibles (Coins & Shapes)
      collectiblesRef.current.forEach((item) => {
        if (!item.collected) {
          ctx.save()
          ctx.translate(item.x, item.y + Math.sin(Date.now() / 200) * 4)
          ctx.font = item.type === 'coin' ? '18px sans-serif' : '22px sans-serif'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(item.icon, 0, 0)
          ctx.restore()
        }
      })

      // 4. Draw Character Si Segitiga
      const p = playerRef.current
      ctx.save()
      ctx.translate(p.x + p.width / 2, p.y + p.height / 2)
      if (p.facing === 'left') {
        ctx.scale(-1, 1)
      }

      // Yellow Triangle Mascot Body
      ctx.fillStyle = '#f59e0b'
      ctx.strokeStyle = '#b45309'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(0, -18)
      ctx.lineTo(18, 16)
      ctx.lineTo(-18, 16)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Mascot Eyes
      ctx.fillStyle = '#0f172a'
      ctx.beginPath()
      ctx.arc(3, 2, 2.5, 0, Math.PI * 2)
      ctx.arc(10, 2, 2.5, 0, Math.PI * 2)
      ctx.fill()

      // Mascot Smile
      ctx.strokeStyle = '#0f172a'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(6, 7, 3.5, 0, Math.PI)
      ctx.stroke()

      // Mascot Backpack
      ctx.fillStyle = '#0284c7'
      ctx.fillRect(-16, -2, 7, 14)

      // Shoes
      ctx.fillStyle = '#78350f'
      ctx.fillRect(-8, 16, 7, 4)
      ctx.fillRect(4, 16, 7, 4)

      ctx.restore()

      animationId = requestAnimationFrame(gameLoop)
    }

    animationId = requestAnimationFrame(gameLoop)
    return () => cancelAnimationFrame(animationId)
  }, [isPaused, showCompleteBanner, isGameOver, levelData.totalTargetShapes, coinsCollected, shapesCollected, handleComplete])

  return (
    <div className="level-flow-screen exploration-screen">
      {/* Top Header Bar matching Screen 3 with Lives Indicator */}
      <header className="flow-top-bar explore-bar">
        <button
          type="button"
          className="flow-pause-circle-btn"
          onClick={() => {
            sounds.playClick()
            setIsPaused((prev) => !prev)
          }}
          aria-label="Jeda Permainan"
        >
          <span>{isPaused ? '▶' : '⏸'}</span>
        </button>

        {/* Center Coin Counter */}
        <div className="flow-header-coins-pill">
          <span className="coin-icon">🪙</span>
          <span className="coin-number">{coinsCollected}</span>
        </div>

        {/* Lives (Hati / Nyawa) Indicator: 3 Hearts */}
        <div className="flow-header-lives-display" title={`Sisa Nyawa: ${lives}/3`}>
          {[1, 2, 3].map((heartIndex) => (
            <span
              key={heartIndex}
              className={`heart-icon ${heartIndex <= lives ? 'heart-full' : 'heart-empty'}`}
            >
              {heartIndex <= lives ? '❤️' : '🤍'}
            </span>
          ))}
        </div>
      </header>

      {/* Target Shapes Banner */}
      <div className="explore-shapes-banner">
        <span className="banner-kicker-text">Kumpulkan semua bentuk!</span>
        <div className="target-shapes-chips-row">
          {levelData.targetShapes.map((shape) => (
            <span key={shape.type} className="target-shape-emoji" title={shape.name}>
              {shape.icon}
            </span>
          ))}
          <span className="target-progress-badge">
            {shapesCollected} / {levelData.totalTargetShapes}
          </span>
        </div>
      </div>

      {/* Interactive 2D Game Area */}
      <div className="explore-canvas-container">
        <canvas
          ref={canvasRef}
          width={400}
          height={380}
          className="explore-game-canvas"
        />

        {/* Complete Celebration Overlay */}
        {showCompleteBanner && (
          <div className="explore-complete-overlay">
            <div className="complete-pop-card">
              <span className="complete-emoji">🎉 🔺 🟦 ⭕</span>
              <h3>Bentuk Berhasil Dikumpulkan!</h3>
              <p>Hebat! Sekarang saatnya menyelesaikan tantangan soal!</p>
            </div>
          </div>
        )}

        {/* Game Over (Nyawa Habis) Overlay */}
        {isGameOver && (
          <div className="explore-gameover-overlay">
            <div className="gameover-dialog-card">
              <span className="gameover-broken-heart">💔</span>
              <h3>Nyawa Habis!</h3>
              <p>Kamu terjatuh ke awan. Jangan berkecil hati, ayo bangkit dan kumpulkan bentuknya lagi!</p>
              <div className="gameover-actions-column">
                <button
                  type="button"
                  className="gameover-retry-btn"
                  onClick={handleRetryExploration}
                >
                  🔄 Ulangi (Isi 3 Nyawa)
                </button>
                <button
                  type="button"
                  className="gameover-exit-btn"
                  onClick={onExit}
                >
                  ✕ Kembali ke Peta
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pause Modal */}
        {isPaused && (
          <div className="explore-pause-overlay">
            <div className="pause-dialog-card">
              <h3>Permainan Dijeda</h3>
              <button
                type="button"
                className="pause-action-btn primary"
                onClick={() => setIsPaused(false)}
              >
                ▶ Lanjutkan
              </button>
              <button
                type="button"
                className="pause-action-btn secondary"
                onClick={() => onFinishExploration(coinsCollected || 12, 5, lives)}
              >
                ⏩ Lewati ke Soal
              </button>
              <button
                type="button"
                className="pause-action-btn exit"
                onClick={onExit}
              >
                ✕ Keluar ke Peta
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls Bar at Bottom matching Screen 3 */}
      <footer className="explore-controls-footer">
        <div className="dpad-left-right-group">
          <button
            type="button"
            className="control-circle-btn btn-left"
            onMouseDown={() => handleControlDown('left')}
            onMouseUp={() => handleControlUp('left')}
            onTouchStart={(e) => { e.preventDefault(); handleControlDown('left'); }}
            onTouchEnd={(e) => { e.preventDefault(); handleControlUp('left'); }}
            aria-label="Gerak Kiri"
          >
            ‹
          </button>
          <button
            type="button"
            className="control-circle-btn btn-right"
            onMouseDown={() => handleControlDown('right')}
            onMouseUp={() => handleControlUp('right')}
            onTouchStart={(e) => { e.preventDefault(); handleControlDown('right'); }}
            onTouchEnd={(e) => { e.preventDefault(); handleControlUp('right'); }}
            aria-label="Gerak Kanan"
          >
            ›
          </button>
        </div>

        <button
          type="button"
          className="control-circle-btn btn-jump"
          onMouseDown={() => handleControlDown('jump')}
          onMouseUp={() => handleControlUp('jump')}
          onTouchStart={(e) => { e.preventDefault(); handleControlDown('jump'); }}
          onTouchEnd={(e) => { e.preventDefault(); handleControlUp('jump'); }}
          aria-label="Lompat"
        >
          ▲
        </button>
      </footer>
    </div>
  )
}
