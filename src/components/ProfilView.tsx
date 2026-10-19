import React, { useState } from 'react'
import { sounds } from '../utils/sound'

interface ProfilViewProps {
  playerName: string
  avatar: string
  playerLevel: number
  stars: number
  gems: number
  onUpdateProfile: (name: string, avatar: string) => void
  onBackToHome: () => void
}

const availableAvatars = ['👦🏻', '👧🏻', '🧒🏽', '🧑🏼', '🎒', '📐', '👑', '⭐']

export const ProfilView: React.FC<ProfilViewProps> = ({
  playerName,
  avatar,
  playerLevel,
  stars,
  gems,
  onUpdateProfile,
  onBackToHome,
}) => {
  const [editingName, setEditingName] = useState(playerName)
  const [selectedAvatar, setSelectedAvatar] = useState(avatar)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    sounds.playSuccess()
    onUpdateProfile(editingName.trim() || 'Rizki', selectedAvatar)
    setIsEditing(false)
  }

  return (
    <div className="sub-view-screen profil-screen">
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
        <h2 className="sub-view-title">👦🏻 Profil Siswa</h2>
        <div className="sub-header-currencies">
          <span className="sub-pill">⭐ {stars}</span>
          <span className="sub-pill">💎 {gems}</span>
        </div>
      </div>

      <div className="profil-content-scroll">
        {/* Main Profile Card */}
        <div className="profile-hero-card">
          <div className="avatar-large-container">
            <span className="avatar-emoji">{selectedAvatar}</span>
            {isEditing && (
              <span className="avatar-edit-chip">Pilih di bawah ↓</span>
            )}
          </div>

          {isEditing ? (
            <div className="profile-edit-form">
              <input
                type="text"
                className="profile-name-input"
                value={editingName}
                maxLength={18}
                onChange={(e) => setEditingName(e.target.value)}
                placeholder="Nama Siswa"
              />
              {/* Avatar Selector */}
              <div className="avatar-options-row">
                {availableAvatars.map((av) => (
                  <button
                    key={av}
                    type="button"
                    className={`avatar-option-btn ${selectedAvatar === av ? 'active' : ''}`}
                    onClick={() => { sounds.playClick(); setSelectedAvatar(av); }}
                  >
                    {av}
                  </button>
                ))}
              </div>
              <button type="button" className="profile-save-btn" onClick={handleSave}>
                Simpan Perubahan ✓
              </button>
            </div>
          ) : (
            <div className="profile-text-info">
              <h3>{playerName}</h3>
              <span className="profile-role-tag">Siswa · Penjelajah Cilik</span>
              <button
                type="button"
                className="profile-edit-toggle-btn"
                onClick={() => { sounds.playClick(); setIsEditing(true); }}
              >
                ✏ Ubah Nama & Foto
              </button>
            </div>
          )}

          {/* Level Progress */}
          <div className="profile-level-box">
            <div className="level-box-header">
              <strong>Level {playerLevel}</strong>
              <span>850 / 1000 XP</span>
            </div>
            <div className="level-box-track">
              <div className="level-box-fill" style={{ width: '85%' }} />
            </div>
            <span className="level-box-hint">Tinggal 150 XP lagi untuk naik ke Level 4! 🚀</span>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="profile-stats-grid">
          <div className="stat-card">
            <span className="stat-icon">⭐</span>
            <strong>{stars}</strong>
            <span>Bintang Didapat</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💎</span>
            <strong>{gems}</strong>
            <span>Permata Disimpan</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🎯</span>
            <strong>95%</strong>
            <span>Akurasi Kuis</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🏆</span>
            <strong>18</strong>
            <span>Tantangan Tuntas</span>
          </div>
        </div>

        {/* Student Badge Card */}
        <div className="student-badge-showcase">
          <h4>🏅 Lencana Favorit</h4>
          <div className="fav-badges-row">
            <div className="fav-badge-chip">
              <span>📐</span>
              <strong>Master Segitiga</strong>
            </div>
            <div className="fav-badge-chip">
              <span>🌟</span>
              <strong>Siswa Rajin</strong>
            </div>
            <div className="fav-badge-chip">
              <span>🔥</span>
              <strong>Juara Bertahan</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
