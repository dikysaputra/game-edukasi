import React from 'react'
import { sounds } from '../../utils/sound'
import type { LevelDetailData } from '../../data/levelFlowData'

interface LevelResultViewProps {
  levelData: LevelDetailData
  finalScore: number
  correctCount: number
  coinsEarned: number
  remainingLives: number
  onContinue: () => void
  onReplay: () => void
}

export const LevelResultView: React.FC<LevelResultViewProps> = ({
  levelData,
  finalScore,
  correctCount,
  coinsEarned,
  remainingLives,
  onContinue,
  onReplay,
}) => {
  // Calculate star rating based strictly on remaining hearts / lives
  // 3 lives = 3 stars, 2 lives = 2 stars, 1 life = 1 star
  const earnedStars = Math.max(1, Math.min(3, remainingLives ?? 3))

  const starDescriptions: Record<number, string> = {
    3: 'Sempurna! (3/3)',
    2: 'Bagus! (2/3)',
    1: 'Berhasil! (1/3)',
  }

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

        {/* 3 Giant Golden / Dimmed Stars based strictly on remaining lives */}
        <div className="result-giant-stars-row" role="img" aria-label={`Perolehan: ${earnedStars} dari 3 Bintang`}>
          {/* Star 1 (Left) */}
          <div className={`giant-star-slot s-left ${earnedStars >= 1 ? 'is-earned' : 'is-lost'}`}>
            <svg width="48" height="48" viewBox="0 0 24 24" className="giant-star-svg">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={earnedStars >= 1 ? '#facc15' : '#334155'}
                stroke={earnedStars >= 1 ? '#fef08a' : '#64748b'}
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Star 2 (Center - Primary Big Star) */}
          <div className={`giant-star-slot s-center ${earnedStars >= 2 ? 'is-earned' : 'is-lost'}`}>
            <svg width="64" height="64" viewBox="0 0 24 24" className="giant-star-svg">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={earnedStars >= 2 ? '#facc15' : '#334155'}
                stroke={earnedStars >= 2 ? '#fef08a' : '#64748b'}
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Star 3 (Right) */}
          <div className={`giant-star-slot s-right ${earnedStars >= 3 ? 'is-earned' : 'is-lost'}`}>
            <svg width="48" height="48" viewBox="0 0 24 24" className="giant-star-svg">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={earnedStars >= 3 ? '#facc15' : '#334155'}
                stroke={earnedStars >= 3 ? '#fef08a' : '#64748b'}
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>
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
          {/* Skor Row */}
          <div className="summary-stat-row">
            <div className="stat-left">
              <span className="stat-icon-star">🏆</span>
              <span className="stat-label">Skor Akhir</span>
            </div>
            <strong className="stat-value-big">{finalScore || levelData.rewardBaseScore}</strong>
          </div>

          {/* Perolehan Bintang Row (Sesuaikan dengan sisa nyawa) */}
          <div className="summary-stat-row">
            <div className="stat-left">
              <span className="stat-icon-star">⭐</span>
              <span className="stat-label">Bintang</span>
            </div>
            <div className="stars-result-badge-wrap">
              <div className="stars-result-icons">
                {[1, 2, 3].map((sIndex) => (
                  <span
                    key={sIndex}
                    className={`result-star-chip ${sIndex <= earnedStars ? 'chip-gold' : 'chip-dimmed'}`}
                  >
                    {sIndex <= earnedStars ? '⭐' : '☆'}
                  </span>
                ))}
              </div>
              <span className="stars-result-caption">{starDescriptions[earnedStars]}</span>
            </div>
          </div>

          {/* Sisa Nyawa Row */}
          <div className="summary-stat-row">
            <div className="stat-left">
              <span className="stat-icon-heart">❤️</span>
              <span className="stat-label">Sisa Nyawa</span>
            </div>
            <div className="lives-result-badge">
              {[1, 2, 3].map((h) => (
                <span
                  key={h}
                  className={`heart-icon ${h <= remainingLives ? 'heart-full' : 'heart-empty'}`}
                >
                  {h <= remainingLives ? '❤️' : '🤍'}
                </span>
              ))}
              <strong className="lives-ratio-text">({remainingLives}/3)</strong>
            </div>
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
