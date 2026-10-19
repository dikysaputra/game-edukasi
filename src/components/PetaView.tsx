import React from 'react'
import { sounds } from '../utils/sound'
import { gameLevels } from '../data/quizQuestions'

interface PetaViewProps {
  stars: number
  gems: number
  onStartLevel: (level: number) => void
  onBackToHome: () => void
}

export const PetaView: React.FC<PetaViewProps> = ({ stars, gems, onStartLevel, onBackToHome }) => {
  return (
    <div className="sub-view-screen peta-screen">
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
        <h2 className="sub-view-title">🗺️ Peta Petualangan</h2>
        <div className="sub-header-currencies">
          <span className="sub-pill">⭐ {stars}</span>
          <span className="sub-pill">💎 {gems}</span>
        </div>
      </div>

      <div className="peta-content-scroll">
        <div className="peta-banner-card">
          <span className="peta-banner-kicker">DUNIA BANGUN DATAR</span>
          <h3>Jelajahi 5 Zona Bentuk Ajaib!</h3>
          <p>Kumpulkan bintang dari setiap level untuk membuka gerbang Benteng Poligon.</p>
        </div>

        {/* Level Path Nodes */}
        <div className="levels-path-container">
          {gameLevels.map((lvl, index) => {
            const isUnlocked = stars >= lvl.minStars || lvl.unlocked
            return (
              <div key={lvl.level} className={`level-path-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                <div className="level-badge-col">
                  <div className={`level-circle-node ${isUnlocked ? 'active-node' : 'locked-node'}`}>
                    {isUnlocked ? lvl.level : '🔒'}
                  </div>
                  {index < gameLevels.length - 1 && <div className="level-connector-line" />}
                </div>

                <div className="level-info-col">
                  <div className="level-title-row">
                    <h4>{lvl.title}</h4>
                    <span className={`level-status-pill ${isUnlocked ? 'ready' : 'lock'}`}>
                      {isUnlocked ? 'Terbuka' : `Butuh ${lvl.minStars} ⭐`}
                    </span>
                  </div>

                  <p className="level-reward-text">
                    Hadiah: <span>+{lvl.rewardStars} ⭐</span> dan <span>+{lvl.rewardGems} 💎</span>
                  </p>

                  <div className="level-stars-rating">
                    <span className="star-filled">★</span>
                    <span className="star-filled">★</span>
                    <span className={lvl.level <= 2 ? 'star-filled' : 'star-empty'}>★</span>
                  </div>

                  <button
                    type="button"
                    className={`level-action-btn ${isUnlocked ? 'btn-play' : 'btn-locked'}`}
                    disabled={!isUnlocked}
                    onClick={() => {
                      if (isUnlocked) {
                        sounds.playClick()
                        onStartLevel(lvl.level)
                      }
                    }}
                  >
                    {isUnlocked ? '▶ Mainkan Sekarang' : 'Terkunci'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
