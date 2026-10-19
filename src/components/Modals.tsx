import React from 'react'
import { sounds } from '../utils/sound'
import type { MissionItem } from '../data/missionsData'

// Modal 1: Daily Missions Modal
interface MissionsModalProps {
  missions: MissionItem[]
  onClaim: (id: string) => void
  onClose: () => void
}

export const MissionsModal: React.FC<MissionsModalProps> = ({ missions, onClaim, onClose }) => {
  return (
    <div className="game-modal-backdrop" onClick={onClose}>
      <div className="game-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-sheet-header">
          <div className="modal-title-with-icon">
            <span className="modal-title-icon">📋</span>
            <h3>Misi Harian Petualang</h3>
          </div>
          <button type="button" className="modal-close-x" onClick={onClose}>✕</button>
        </div>

        <p className="modal-subtitle-text">
          Selesaikan misi setiap hari untuk mengumpulkan bintang dan permata gratis!
        </p>

        <div className="modal-missions-list">
          {missions.map((m) => {
            const isCompleted = m.progress >= m.target
            return (
              <div key={m.id} className="modal-mission-item">
                <span className="mission-item-emoji">{m.icon}</span>
                <div className="mission-item-details">
                  <strong>{m.title}</strong>
                  <p>{m.description}</p>
                  <div className="mission-item-bar">
                    <div
                      className="mission-item-fill"
                      style={{ width: `${Math.min(100, (m.progress / m.target) * 100)}%` }}
                    />
                  </div>
                  <span className="mission-progress-label">
                    Progres: {m.progress} / {m.target}
                  </span>
                </div>

                <div className="mission-item-action">
                  {m.claimed ? (
                    <span className="badge-claimed">✓ Diklaim</span>
                  ) : isCompleted ? (
                    <button
                      type="button"
                      className="btn-claim-reward"
                      onClick={() => {
                        sounds.playStarCoin()
                        onClaim(m.id)
                      }}
                    >
                      Klaim +{m.rewardAmount} {m.rewardType === 'stars' ? '⭐' : '💎'}
                    </button>
                  ) : (
                    <span className="badge-in-progress">
                      +{m.rewardAmount} {m.rewardType === 'stars' ? '⭐' : '💎'}
                    </span>
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

// Modal 2: Settings Modal
interface SettingsModalProps {
  soundEnabled: boolean
  onToggleSound: () => void
  onResetProgress: () => void
  onClose: () => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  soundEnabled,
  onToggleSound,
  onResetProgress,
  onClose,
}) => {
  return (
    <div className="game-modal-backdrop" onClick={onClose}>
      <div className="game-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-sheet-header">
          <div className="modal-title-with-icon">
            <span className="modal-title-icon">⚙️</span>
            <h3>Pengaturan Permainan</h3>
          </div>
          <button type="button" className="modal-close-x" onClick={onClose}>✕</button>
        </div>

        <div className="settings-items-list">
          <div className="settings-row">
            <div className="settings-label-col">
              <strong>Efek Suara Game</strong>
              <span>Suara klik, nada benar, dan fanfare</span>
            </div>
            <button
              type="button"
              className={`toggle-switch ${soundEnabled ? 'active' : ''}`}
              onClick={() => { sounds.playClick(); onToggleSound(); }}
            >
              <span className="toggle-thumb" />
            </button>
          </div>

          <div className="settings-row">
            <div className="settings-label-col">
              <strong>Bahasa Permainan</strong>
              <span>Bahasa Indonesia (Standar Kurikulum SD)</span>
            </div>
            <span className="setting-tag-badge">🇮🇩 Indonesia</span>
          </div>

          <div className="settings-row">
            <div className="settings-label-col">
              <strong>Mode Perangkat</strong>
              <span>Dioptimalkan untuk Mobile / Layar Sentuh</span>
            </div>
            <span className="setting-tag-badge">📱 Aktif</span>
          </div>

          <div className="settings-row danger-zone">
            <div className="settings-label-col">
              <strong>Reset Data Permainan</strong>
              <span>Kembalikan bintang, permata, dan riwayat kuis</span>
            </div>
            <button
              type="button"
              className="btn-danger-reset"
              onClick={() => {
                if (window.confirm('Apakah kamu yakin ingin mereset progres permainan?')) {
                  sounds.playClick()
                  onResetProgress()
                  onClose()
                }
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Modal 3: Stars Shop / Free Stars Modal
interface StarsShopModalProps {
  stars: number
  onAddStars: (amount: number) => void
  onClose: () => void
}

export const StarsShopModal: React.FC<StarsShopModalProps> = ({ stars, onAddStars, onClose }) => {
  return (
    <div className="game-modal-backdrop" onClick={onClose}>
      <div className="game-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-sheet-header">
          <div className="modal-title-with-icon">
            <span className="modal-title-icon">⭐</span>
            <h3>Koleksi Bintang Ajaib</h3>
          </div>
          <button type="button" className="modal-close-x" onClick={onClose}>✕</button>
        </div>

        <div className="shop-balance-banner">
          <span>Total Bintang Kamu:</span>
          <strong>⭐ {stars}</strong>
        </div>

        <p className="modal-subtitle-text">
          Bintang digunakan untuk membuka level baru di Peta Petualangan!
        </p>

        <div className="shop-options-list">
          <div className="shop-item-card">
            <span className="shop-item-emoji">🎁</span>
            <div className="shop-item-info">
              <strong>Bintang Harian Gratis</strong>
              <span>Hadiah masuk setiap hari</span>
            </div>
            <button
              type="button"
              className="btn-shop-action"
              onClick={() => {
                sounds.playStarCoin()
                onAddStars(20)
                onClose()
              }}
            >
              Ambil +20 ⭐
            </button>
          </div>

          <div className="shop-item-card">
            <span className="shop-item-emoji">🏆</span>
            <div className="shop-item-info">
              <strong>Latihan Soal Ekstra</strong>
              <span>Jawab kuis di menu Mulai Petualangan</span>
            </div>
            <span className="shop-hint-tag">Mainkan Kuis</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Modal 4: Gems Shop Modal
interface GemsShopModalProps {
  gems: number
  onAddGems: (amount: number) => void
  onClose: () => void
}

export const GemsShopModal: React.FC<GemsShopModalProps> = ({ gems, onAddGems, onClose }) => {
  return (
    <div className="game-modal-backdrop" onClick={onClose}>
      <div className="game-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-sheet-header">
          <div className="modal-title-with-icon">
            <span className="modal-title-icon">💎</span>
            <h3>Pundi Permata Berkilau</h3>
          </div>
          <button type="button" className="modal-close-x" onClick={onClose}>✕</button>
        </div>

        <div className="shop-balance-banner gem-banner">
          <span>Total Permata Kamu:</span>
          <strong>💎 {gems}</strong>
        </div>

        <p className="modal-subtitle-text">
          Permata dapat digunakan untuk membeli lencana eksklusif dan petunjuk kuis!
        </p>

        <div className="shop-options-list">
          <div className="shop-item-card">
            <span className="shop-item-emoji">💎</span>
            <div className="shop-item-info">
              <strong>Bonus Permata Cilik</strong>
              <span>Klaim bonus permata untukmu</span>
            </div>
            <button
              type="button"
              className="btn-shop-action gem-btn"
              onClick={() => {
                sounds.playStarCoin()
                onAddGems(15)
                onClose()
              }}
            >
              Klaim +15 💎
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
