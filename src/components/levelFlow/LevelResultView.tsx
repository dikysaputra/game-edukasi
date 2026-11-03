import React from 'react'
import { sounds } from '../../utils/sound'
import type { LevelDetailData } from '../../data/levelFlowData'

interface LevelResultViewProps {
  levelData: LevelDetailData
  finalScore: number
  correctCount: number
  coinsEarned: number
  onContinue: () => void
  onReplay: () => void
}

export const LevelResultView: React.FC<LevelResultViewProps> = ({
  levelData,
  finalScore,
  correctCount,
  coinsEarned,
  onContinue,
  onReplay,
}) => {
  return (
    <div className="level-flow-screen result-level-screen">
      <div className="result-celebration-container">
        {/* Floating Confetti particles */}
        <div className="confetti-particles" aria-hidden="true">
          <span className="confetti c1">🎊</span>
          <span className="confetti c2">✨</span>
          <span className="confetti c3">⭐</span>
          <span className="confetti c4">🎉</span>
          <span className="confetti c5">✨</span>
        </div>

        {/* 3 Giant Golden Stars */}
        <div className="result-giant-stars-row">
          <span className="giant-star s-left">⭐</span>
          <span className="giant-star s-center">⭐</span>
          <span className="giant-star s-right">⭐</span>
        </div>

        {/* Orange Ribbon Title Banner */}
        <div className="result-ribbon-banner">
          <h2>Level Selesai!</h2>
        </div>

        {/* Happy Jumping Mascot Character */}
        <div className="result-mascot-jumping" aria-hidden="true">
          <div className="mascot-happy-triangle">
            <span className="mascot-tri-body">▲</span>
            <div className="mascot-happy-face">
              <span className="mascot-happy-eyes">^‿^</span>
            </div>
            <span className="mascot-arms-up">🙌</span>
            <span className="mascot-backpack-side">🎒</span>
          </div>
        </div>

        {/* White Summary Card */}
        <div className="result-score-summary-card">
          <div className="summary-stat-row">
            <div className="stat-left">
              <span className="stat-icon-star">⭐</span>
              <span className="stat-label">Skor</span>
            </div>
            <strong className="stat-value-big">{finalScore || levelData.rewardBaseScore}</strong>
          </div>

          <div className="summary-stat-row">
            <div className="stat-left">
              <span className="stat-icon-xp">🟣</span>
              <span className="stat-label">XP</span>
            </div>
            <div className="stat-value-badge xp-badge">
              <span>+{levelData.rewardXp} XP</span>
            </div>
          </div>

          <div className="summary-stat-row">
            <div className="stat-left">
              <span className="stat-icon-coin">🪙</span>
              <span className="stat-label">Koin</span>
            </div>
            <strong className="stat-value-coin">+{coinsEarned || levelData.rewardCoins}</strong>
          </div>

          <div className="summary-stat-row divider-top">
            <div className="stat-left">
              <span className="stat-icon-clipboard">📋</span>
              <span className="stat-label">Jawaban</span>
            </div>
            <span className="stat-correct-badge">
              ✅ {correctCount || 5} benar / {levelData.questions.length}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="result-actions-column">
          <button
            type="button"
            className="btn-result-continue"
            onClick={() => {
              sounds.playStarCoin()
              onContinue()
            }}
          >
            Lanjutkan
          </button>

          <button
            type="button"
            className="btn-result-replay"
            onClick={() => {
              sounds.playClick()
              onReplay()
            }}
          >
            🔄 Ulangi
          </button>
        </div>
      </div>
    </div>
  )
}
