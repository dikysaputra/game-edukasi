import React from 'react'
import { sounds } from '../utils/sound'
import type { MapLevelInfo } from '../data/quizQuestions'

interface LevelPreviewModalProps {
  levelInfo: MapLevelInfo
  currentStars: number
  onStartLevel: (level: number) => void
  onClose: () => void
}

export const LevelPreviewModal: React.FC<LevelPreviewModalProps> = ({
  levelInfo,
  currentStars,
  onStartLevel,
  onClose,
}) => {
  const isUnlocked = levelInfo.unlocked || currentStars >= levelInfo.minStars

  return (
    <div className="game-modal-backdrop" onClick={onClose}>
      <div className="game-modal-sheet level-preview-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-sheet-header">
          <div className="modal-title-with-icon">
            <span className="modal-level-badge">Level {levelInfo.level}</span>
            <div>
              <h3>{levelInfo.islandName}</h3>
              <span className="modal-sub-label">{levelInfo.islandSubtitle}</span>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-x"
            onClick={() => { sounds.playClick(); onClose(); }}
          >
            ✕
          </button>
        </div>

        {/* Level Details Card */}
        <div className="level-preview-hero-card">
          <div className="preview-stars-display">
            <span className={levelInfo.starsEarned >= 1 ? 'star-gold' : 'star-dim'}>★</span>
            <span className={levelInfo.starsEarned >= 2 ? 'star-gold' : 'star-dim'}>★</span>
            <span className={levelInfo.starsEarned >= 3 ? 'star-gold' : 'star-dim'}>★</span>
          </div>

          <h4 className="preview-level-title">{levelInfo.title}</h4>
          <p className="preview-level-desc">{levelInfo.description}</p>

          {/* Reward Box */}
          <div className="preview-rewards-pill">
            <span className="reward-label">Hadiah Penyelesaian:</span>
            <div className="reward-badges">
              <span className="badge-star">+{levelInfo.rewardStars} ⭐</span>
              <span className="badge-gem">+{levelInfo.rewardGems} 💎</span>
            </div>
          </div>
        </div>

        {/* Lock condition or Play button */}
        {!isUnlocked && (
          <div className="level-locked-notice">
            <span className="lock-icon">🔒</span>
            <div className="lock-text">
              <strong>Level Masih Terkunci</strong>
              <p>Kumpulkan setidaknya {levelInfo.minStars} ⭐ bintang untuk membuka jalur petualangan ini.</p>
            </div>
          </div>
        )}

        <div className="level-modal-actions">
          {isUnlocked ? (
            <button
              type="button"
              className="btn-play-level-modal"
              onClick={() => {
                sounds.playClick()
                onClose()
                onStartLevel(levelInfo.level)
              }}
            >
              ▶ Mainkan Petualangan
            </button>
          ) : (
            <button
              type="button"
              className="btn-locked-level-modal"
              onClick={() => {
                // Allow instant preview unlock or helpful prompt
                sounds.playClick()
                onClose()
                onStartLevel(levelInfo.level)
              }}
            >
              🔓 Coba Tantangan Ini Sekarang
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
