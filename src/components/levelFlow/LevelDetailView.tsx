import React from 'react'
import { sounds } from '../../utils/sound'
import type { LevelDetailData } from '../../data/levelFlowData'

interface LevelDetailViewProps {
  levelData: LevelDetailData
  playerStars: number
  playerCoins: number
  onBackToMap: () => void
  onStartExploration: () => void
}

export const LevelDetailView: React.FC<LevelDetailViewProps> = ({
  levelData,
  playerStars,
  playerCoins,
  onBackToMap,
  onStartExploration,
}) => {
  return (
    <div className="level-flow-screen detail-level-screen">
      {/* Top Header Bar */}
      <header className="flow-top-bar">
        <button
          type="button"
          className="flow-back-circle-btn"
          onClick={() => {
            sounds.playClick()
            onBackToMap()
          }}
          aria-label="Kembali ke Peta"
        >
          <span className="back-arrow-icon">‹</span>
        </button>

        <div className="flow-header-currencies">
          <div className="flow-currency-badge star-badge">
            <span className="curr-icon">⭐</span>
            <span className="curr-val">{playerStars}</span>
          </div>
          <div className="flow-currency-badge coin-badge">
            <span className="curr-icon">🪙</span>
            <span className="curr-val">{playerCoins}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="detail-level-body">
        {/* Wooden Plaque Title */}
        <div className="level-title-container">
          <div className="wooden-plaque-title">
            <h2>Level {levelData.levelNumber}</h2>
          </div>
          <div className="blue-ribbon-sub">
            <span>{levelData.levelTitle}</span>
          </div>
        </div>

        {/* Tujuan (Objective) Card */}
        <div className="objective-white-card">
          <div className="objective-header-row">
            <strong>Tujuan:</strong>
          </div>
          <p className="objective-text">{levelData.objective}</p>

          {/* Stars Preview */}
          <div className="detail-stars-row">
            <span className="detail-star filled">★</span>
            <span className="detail-star filled">★</span>
            <span className="detail-star filled">★</span>
          </div>

          {/* Badges for Time & Challenges */}
          <div className="detail-meta-pills">
            <div className="meta-pill">
              <span className="meta-icon">⏱️</span>
              <span>{levelData.estimatedTime}</span>
            </div>
            <div className="meta-pill">
              <span className="meta-icon">🎯</span>
              <span>{levelData.challengesCount} tantangan</span>
            </div>
          </div>
        </div>

        {/* Scenic Character & Castle Stage Area */}
        <div className="detail-character-stage">
          {/* Animated clouds and castle backdrop */}
          <div className="stage-scenery" aria-hidden="true">
            <div className="scenery-castle-turret">🏰</div>
            <div className="scenery-bridge" />
            <div className="scenery-cloud-float float-c1">☁️</div>
            <div className="scenery-cloud-float float-c2">☁️</div>
          </div>

          {/* Character Si Segitiga standing on bridge */}
          <div
            className="detail-hero-mascot"
            onClick={() => sounds.playBoing()}
            role="button"
            tabIndex={0}
            title="Si Segitiga Siap Bertualang!"
          >
            <div className="triangle-mascot-visual">
              <span className="mascot-body-emoji">▲</span>
              <div className="mascot-face">
                <span className="mascot-eye left">👀</span>
                <span className="mascot-smile">‿</span>
              </div>
              <span className="mascot-backpack">🎒</span>
            </div>
          </div>
        </div>

        {/* Big Yellow "Mulai" Button */}
        <div className="detail-action-bottom">
          <button
            type="button"
            className="big-yellow-play-btn"
            onClick={() => {
              sounds.playClick()
              onStartExploration()
            }}
          >
            <span className="play-btn-glow-ring" />
            <span className="play-btn-text">Mulai</span>
          </button>
        </div>
      </div>
    </div>
  )
}
