import React from 'react'
import { sounds } from '../utils/sound'
import type { AchievementItem } from '../data/achievementsData'

interface PrestasiViewProps {
  achievements: AchievementItem[]
  stars: number
  gems: number
  onClaimAchievement: (id: string) => void
  onBackToHome: () => void
}

export const PrestasiView: React.FC<PrestasiViewProps> = ({
  achievements,
  stars,
  gems,
  onClaimAchievement,
  onBackToHome,
}) => {
  const completedCount = achievements.filter((a) => a.unlocked || a.progress >= a.maxProgress).length

  return (
    <div className="sub-view-screen prestasi-screen">
      {/* Header Bar */}
      <div className="sub-view-header">
        <button
          type="button"
          className="sub-back-btn"
          onClick={() => { sounds.playClick(); onBackToHome(); }}
          aria-label="Kembali ke Beranda"
        >
          ← Beranda
        </button>
        <h2 className="sub-view-title">🏆 Koleksi Prestasi</h2>
        <div className="sub-header-currencies">
          <span className="sub-pill">⭐ {stars}</span>
          <span className="sub-pill">💎 {gems}</span>
        </div>
      </div>

      <div className="prestasi-content-scroll">
        {/* Banner Card */}
        <div className="prestasi-summary-card">
          <div className="trophy-big-icon">🏆</div>
          <div className="summary-details">
            <h3>Lencana Petualang</h3>
            <p>Raih pencapaian istimewa selama menjelajahi dunia bangun datar!</p>
            <div className="summary-progress-bar">
              <div
                className="summary-progress-fill"
                style={{ width: `${(completedCount / achievements.length) * 100}%` }}
              />
            </div>
            <span className="summary-count">
              Terbuka {completedCount} dari {achievements.length} Lencana
            </span>
          </div>
        </div>

        {/* List of Badges */}
        <div className="achievements-list">
          {achievements.map((item) => {
            const isCompleted = item.progress >= item.maxProgress || item.unlocked
            const canClaim = isCompleted && !item.claimed

            return (
              <div key={item.id} className={`achievement-card ${isCompleted ? 'achieved' : 'locked'}`}>
                <div className="ach-icon-circle">
                  <span>{item.icon}</span>
                </div>

                <div className="ach-body">
                  <div className="ach-title-row">
                    <h4>{item.title}</h4>
                    <span className="ach-reward-badge">
                      {item.rewardType === 'stars' ? `+${item.rewardAmount} ⭐` : `+${item.rewardAmount} 💎`}
                    </span>
                  </div>
                  <p className="ach-description">{item.description}</p>

                  <div className="ach-progress-row">
                    <div className="ach-progress-track">
                      <div
                        className="ach-progress-fill"
                        style={{
                          width: `${Math.min(100, (item.progress / item.maxProgress) * 100)}%`
                        }}
                      />
                    </div>
                    <span className="ach-progress-text">
                      {item.progress}/{item.maxProgress}
                    </span>
                  </div>
                </div>

                <div className="ach-action-col">
                  {item.claimed ? (
                    <span className="ach-claimed-tag">✓ Diklaim</span>
                  ) : canClaim ? (
                    <button
                      type="button"
                      className="ach-claim-btn"
                      onClick={() => {
                        sounds.playStarCoin()
                        onClaimAchievement(item.id)
                      }}
                    >
                      Klaim!
                    </button>
                  ) : (
                    <span className="ach-pending-tag">Belum Selesai</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
