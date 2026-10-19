import React, { useState } from 'react'
import { sounds } from '../utils/sound'
import type { MissionItem } from '../data/missionsData'

interface BerandaViewProps {
  stars: number
  gems: number
  playerLevel: number
  playerName: string
  avatar: string
  activeMission: MissionItem
  onStartGame: () => void
  onOpenMissions: () => void
  onOpenSettings: () => void
  onOpenStarsShop: () => void
  onOpenGemsShop: () => void
  onOpenProfile: () => void
  onGoToMateri: () => void
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  stars,
  gems,
  playerLevel,
  playerName,
  avatar,
  activeMission,
  onStartGame,
  onOpenMissions,
  onOpenSettings,
  onOpenStarsShop,
  onOpenGemsShop,
  onOpenProfile,
  onGoToMateri,
}) => {
  const [bubbleText, setBubbleText] = useState<string | null>(null)
  const [characterBouncing, setCharacterBouncing] = useState(false)

  const handleHeroClick = () => {
    sounds.playBoing()
    setCharacterBouncing(true)
    const messages = [
      'Halo! Aku Si Segitiga! Punya 3 sisi dan 3 sudut lancip!',
      'Ayo bertualang dan temukan bentuk-bentuk tersembunyi!',
      'Tahukah kamu? Roda itu lingkaran agar bisa menggelinding!',
      'Semangat belajar! Kamu pasti bisa taklukkan Benteng Poligon!'
    ]
    const randomMsg = messages[Math.floor(Math.random() * messages.length)]
    setBubbleText(randomMsg)
    setTimeout(() => setCharacterBouncing(false), 600)
    setTimeout(() => setBubbleText(null), 4500)
  }

  const handleShapesClick = () => {
    sounds.playBoing()
    setBubbleText('Lingkaran & Persegi: "Hei! Jangan lupa kami juga bangun datar yang hebat!"')
    setTimeout(() => setBubbleText(null), 4000)
  }

  const handleCastleClick = () => {
    sounds.playClick()
    setBubbleText('Benteng Poligon: Kumpulkan 240 bintang untuk membuka gerbang rahasia!')
    setTimeout(() => setBubbleText(null), 4000)
  }

  return (
    <div className="beranda-container">
      {/* Background Graphic matching the photo 100% */}
      <img
        src="/game-screen.png"
        alt="Petualangan Bangun Datar"
        className="beranda-art-base"
        draggable={false}
      />

      {/* Floating Sparkles & Clouds animation layer */}
      <div className="sky-particles" aria-hidden="true">
        <span className="sparkle s1">✨</span>
        <span className="sparkle s2">⭐</span>
        <span className="sparkle s3">✨</span>
      </div>

      {/* Speech Bubble for Characters */}
      {bubbleText && (
        <div className="character-speech-bubble" onClick={() => setBubbleText(null)}>
          <span className="speech-tail" />
          <p>{bubbleText}</p>
        </div>
      )}

      {/* --- TOP HEADER INTERACTIVE OVERLAY --- */}
      {/* 1. Player Profile Pill */}
      <button
        type="button"
        className="hotspot-player-pill"
        onClick={() => { sounds.playClick(); onOpenProfile(); }}
        aria-label={`Profil Siswa ${playerName}`}
        title="Buka Profil Siswa"
      >
        <span className="pill-avatar">{avatar}</span>
        <div className="pill-info">
          <span className="pill-role">Siswa</span>
          <strong className="pill-name">{playerName}</strong>
          <div className="pill-progress-track">
            <div className="pill-progress-fill" style={{ width: '75%' }} />
          </div>
          <span className="pill-level">Level {playerLevel}</span>
        </div>
      </button>

      {/* 2. Stars Currency Pill */}
      <div className="hotspot-stars-pill" title="Koleksi Bintang">
        <button
          type="button"
          className="currency-click-area"
          onClick={() => { sounds.playStarCoin(); onOpenStarsShop(); }}
          aria-label="Lihat Bintang"
        >
          <span className="currency-star-icon">⭐</span>
          <span className="currency-value">{stars}</span>
        </button>
        <button
          type="button"
          className="currency-add-btn"
          onClick={(e) => { e.stopPropagation(); sounds.playStarCoin(); onOpenStarsShop(); }}
          aria-label="Tambah Bintang"
        >
          +
        </button>
      </div>

      {/* 3. Gems Currency Pill */}
      <div className="hotspot-gems-pill" title="Koleksi Permata">
        <button
          type="button"
          className="currency-click-area"
          onClick={() => { sounds.playClick(); onOpenGemsShop(); }}
          aria-label="Lihat Permata"
        >
          <span className="currency-gem-icon">💎</span>
          <span className="currency-value">{gems}</span>
        </button>
        <button
          type="button"
          className="currency-add-btn"
          onClick={(e) => { e.stopPropagation(); sounds.playClick(); onOpenGemsShop(); }}
          aria-label="Tambah Permata"
        >
          +
        </button>
      </div>

      {/* 4. Settings Button */}
      <button
        type="button"
        className="hotspot-settings-btn"
        onClick={() => { sounds.playClick(); onOpenSettings(); }}
        aria-label="Pengaturan Game"
        title="Pengaturan"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
        </svg>
      </button>

      {/* --- DAILY MISSION CARD --- */}
      <button
        type="button"
        className="hotspot-mission-card"
        onClick={() => { sounds.playClick(); onOpenMissions(); }}
        aria-label="Misi Hari Ini"
        title="Lihat Detail Misi"
      >
        <div className="mission-icon-wrap">📋</div>
        <div className="mission-text-wrap">
          <span className="mission-title">{activeMission.title}</span>
          <span className="mission-sub">{activeMission.description}</span>
          <div className="mission-bar-track">
            <div
              className="mission-bar-fill"
              style={{ width: `${Math.min(100, (activeMission.progress / activeMission.target) * 100)}%` }}
            />
          </div>
        </div>
        <div className="mission-status-wrap">
          <span className="mission-chevron">›</span>
          <span className="mission-count-badge">
            {activeMission.progress}/{activeMission.target}
          </span>
        </div>
      </button>

      {/* --- MAIN PLAY BUTTON ("Mulai Petualangan") --- */}
      <button
        type="button"
        className="hotspot-play-btn"
        onClick={() => { sounds.playClick(); onStartGame(); }}
        aria-label="Mulai Petualangan"
      >
        <span className="play-btn-glow" />
        <span className="play-triangle-icon" />
        <span className="play-btn-label">Mulai Petualangan</span>
        <span className="play-shine-sweep" />
      </button>

      {/* --- SIGNPOST: "Kenali Bangun Datar" --- */}
      <button
        type="button"
        className="hotspot-signpost"
        onClick={() => { sounds.playClick(); onGoToMateri(); }}
        aria-label="Kenali Bangun Datar - Pelajari Materi"
        title="Buka Buku Materi Bangun Datar"
      >
        <span className="signpost-glow-indicator">📖 Pelajari Bentuk!</span>
      </button>

      {/* --- CHARACTER HERO INTERACTION --- */}
      <div
        className={`hotspot-hero-character ${characterBouncing ? 'hero-bounce-active' : ''}`}
        onClick={handleHeroClick}
        role="button"
        tabIndex={0}
        aria-label="Karakter Segitiga Si Petualang"
        title="Ketuk aku!"
      >
        <span className="hero-tap-hint">Ketuk Aku! 👆</span>
      </div>

      {/* --- GRUMPY SHAPE FRIENDS EASTER EGG --- */}
      <div
        className="hotspot-shape-friends"
        onClick={handleShapesClick}
        role="button"
        tabIndex={0}
        aria-label="Teman-teman Bentuk di Tebing"
        title="Teman Bangun Datar"
      />

      {/* --- CASTLE EASTER EGG --- */}
      <div
        className="hotspot-castle"
        onClick={handleCastleClick}
        role="button"
        tabIndex={0}
        aria-label="Benteng Poligon"
        title="Benteng Poligon"
      />
    </div>
  )
}
